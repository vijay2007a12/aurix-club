import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { UserProfile, UserRole } from '../types';
import { approvedAdminEmails, auth, db, googleProvider } from './firebase';

interface SignUpInput {
  fullName: string;
  email: string;
  password: string;
  year: string;
  domain: string;
}

const getRoleForEmail = (email: string): UserRole => {
  return approvedAdminEmails.includes(email.toLowerCase()) ? 'admin' : 'student';
};

export const getUserProfile = async (uid: string) => {
  const profileRef = doc(db, 'users', uid);
  const profileSnapshot = await getDoc(profileRef);

  if (!profileSnapshot.exists()) {
    return null;
  }

  return profileSnapshot.data() as UserProfile;
};

export const createOrUpdateUserProfile = async (
  user: User,
  profile: Partial<Omit<UserProfile, 'uid' | 'email' | 'createdAt'>> = {}
) => {
  const email = user.email ?? '';
  const existingProfile = await getUserProfile(user.uid);
  const role = profile.role ?? existingProfile?.role ?? getRoleForEmail(email);
  const fullName = profile.fullName ?? existingProfile?.fullName ?? user.displayName ?? '';

  await setDoc(
    doc(db, 'users', user.uid),
    {
      uid: user.uid,
      fullName,
      email,
      role,
      year: profile.year ?? existingProfile?.year ?? '',
      domain: profile.domain ?? existingProfile?.domain ?? '',
      createdAt: existingProfile?.createdAt ?? serverTimestamp(),
    },
    { merge: true }
  );

  return getUserProfile(user.uid);
};

export const signUpStudent = async ({ fullName, email, password, year, domain }: SignUpInput) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: fullName });
  await createOrUpdateUserProfile(credential.user, {
    fullName,
    year,
    domain,
    role: 'student',
  });

  return credential.user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await createOrUpdateUserProfile(credential.user);

  return credential.user;
};

export const loginWithGoogle = async () => {
  const credential = await signInWithPopup(auth, googleProvider);
  await createOrUpdateUserProfile(credential.user);

  return credential.user;
};

export const logout = () => signOut(auth);
