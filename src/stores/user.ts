import { defineStore } from "pinia";
import router from "@/router";
import { auth, db } from "@/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface UserData {
  uid: string;
  email: string;
  role: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserData | null,
    loading: false,
  }),
  actions: {
    async register(email: string, password: string, role = "user") {
      try {
        this.loading = true;
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Save user data in Firestore
        await setDoc(doc(db, "users", cred.user.uid), {
          email,
          role,
          createdAt: new Date(),
        });

        this.user = { uid: cred.user.uid, email, role };

        // Redirect based on role
        if (role === "admin") {
          router.push({ name: "AdminDashboard" });
        } else {
          router.push({ name: "Dashboard" });
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      try {
        this.loading = true;
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", cred.user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();
          this.user = {
            uid: cred.user.uid,
            email: data.email,
            role: data.role,
          };

          // Redirect based on role
          if (data.role === "admin") {
            router.push({ name: "AdminDashboard" });
          } else {
            router.push({ name: "Dashboard" });
          }
        }
      } catch (err) {
        console.error("Login error in store:", err);
        throw err; // <- rethrow so component can handle it
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await signOut(auth);
      this.user = null;
      router.push({ name: "Login" });
    },

    initAuthListener(router: any) {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            this.user = {
              uid: firebaseUser.uid,
              email: data.email,
              role: data.role,
            };

            if (
              router.currentRoute.value.path === "/" ||
              router.currentRoute.value.path === "/login"
            ) {
              router.push(this.user.role === "admin" ? "/admin" : "/dashboard");
            }
          }
        }
      });
    },
  },
});
