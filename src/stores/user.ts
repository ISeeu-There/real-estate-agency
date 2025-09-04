import { defineStore } from "pinia";
import router from "@/router";
import { auth } from "@/plugins/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

interface UserData {
  uid: string;
  email: string;
  role: string;
}

const ADMIN_EMAIL = "admin@gmail.com"; // ✅ only this email can log in

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as UserData | null,
    loading: false,
  }),
  actions: {
    // ✅ Login only allowed for admin email
    async login(email: string, password: string) {
      try {
        this.loading = true;

        const cred = await signInWithEmailAndPassword(auth, email, password);

        if (cred.user.email !== ADMIN_EMAIL) {
          await signOut(auth);
          throw new Error("Access denied: Only admins can log in.");
        }

        this.user = {
          uid: cred.user.uid,
          email: cred.user.email!,
          role: "admin",
        };

        router.push({ name: "AdminDashboard" });
      } catch (err) {
        console.error("Login error:", err);
        throw err;
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
        if (firebaseUser && firebaseUser.email === ADMIN_EMAIL) {
          this.user = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            role: "admin",
          };

          if (
            router.currentRoute.value.path === "/" ||
            router.currentRoute.value.path === "/login"
          ) {
            router.push("/admin");
          }
        } else {
          this.user = null;
          await signOut(auth);
          if (router.currentRoute.value.path.startsWith("/admin")) {
            router.push("/login");
          }
        }
      });
    },
  },
});
