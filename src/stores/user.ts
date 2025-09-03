import { defineStore } from "pinia";
import router from "@/router";
import { auth, db } from "@/plugins/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
    // Admin login only
    async login(email: string, password: string) {
      try {
        this.loading = true;

        const cred = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", cred.user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();

          // Only allow admin
          if (data.role !== "admin") {
            throw new Error("Access denied: Only admins can log in.");
          }

          this.user = {
            uid: cred.user.uid,
            email: data.email,
            role: data.role,
          };

          router.push({ name: "AdminDashboard" });
        } else {
          throw new Error("User not found in database.");
        }
      } catch (err) {
        console.error("Login error:", err);
        throw err; // So component can show error message
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await signOut(auth);
      this.user = null;
      router.push({ name: "AdminLogin" });
    },

    initAuthListener(router: any) {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();

            if (data.role !== "admin") {
              await signOut(auth);
              return;
            }

            this.user = {
              uid: firebaseUser.uid,
              email: data.email,
              role: data.role,
            };

            if (
              router.currentRoute.value.path === "/" ||
              router.currentRoute.value.path === "/login"
            ) {
              router.push("/admin");
            }
          }
        }
      });
    },
  },
});
