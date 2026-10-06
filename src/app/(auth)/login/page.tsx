import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
   return (
      <main className="flex flex-1 items-center justify-center bg-muted p-6">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle className="text-xl">Colour Balloons Admin</CardTitle>
               <CardDescription>Log in with your administrator account.</CardDescription>
            </CardHeader>
            <CardContent>
               <LoginForm />
            </CardContent>
         </Card>
      </main>
   );
}
