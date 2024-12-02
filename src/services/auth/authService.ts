import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { SignUpData, SignInData, User } from '../../types/auth';

export const authService = {
  async signUp({ email, password, name, role, firmName }: SignUpData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  },

  async signIn({ email, password }: SignInData) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idTokenResult = await userCredential.user.getIdTokenResult(true);
    
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email || '',
      displayName: userCredential.user.displayName || '',
      role: idTokenResult.claims.role || 'client',
      firmId: idTokenResult.claims.firmId,
      emailVerified: userCredential.user.emailVerified,
      isAdmin: idTokenResult.claims.admin === true
    } as User;
  },

  async signOut() {
    try {
      await firebaseSignOut(auth);
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    if (!auth.currentUser) return null;
    const idTokenResult = await auth.currentUser.getIdTokenResult(true);
    
    return {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email || '',
      displayName: auth.currentUser.displayName || '',
      role: idTokenResult.claims.role || 'client',
      firmId: idTokenResult.claims.firmId,
      emailVerified: auth.currentUser.emailVerified,
      isAdmin: idTokenResult.claims.admin === true
    } as User;
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const idTokenResult = await firebaseUser.getIdTokenResult(true);
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          role: idTokenResult.claims.role || 'client',
          firmId: idTokenResult.claims.firmId,
          emailVerified: firebaseUser.emailVerified,
          isAdmin: idTokenResult.claims.admin === true
        });
      } else {
        callback(null);
      }
    });
  },

  async sendVerificationEmail() {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  },

  async verifyEmail(actionCode: string) {
    await applyActionCode(auth, actionCode);
  },

  async sendPasswordResetEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
  },

  async verifyPasswordResetCode(code: string) {
    return await verifyPasswordResetCode(auth, code);
  },

  async confirmPasswordReset(code: string, newPassword: string) {
    await confirmPasswordReset(auth, code, newPassword);
  }
};