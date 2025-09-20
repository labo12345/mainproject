@@ .. @@
 export default function DashboardPage() {
-  const { profile, isMockMode } = useAuthContext();
+  const { profile } = useAuthContext();
 
   const dashboardItems = [
     {
@@ -82,7 +81,6 @@ export default function DashboardPage() {
               <p className="text-gray-600 capitalize">
                 {profile?.role || 'Customer'} Dashboard
-                {isMockMode && <span className="text-blue-600 ml-2">(Demo Mode)</span>}
               </p>
             </div>
             
@@ -102,13 +100,6 @@ export default function DashboardPage() {
       </div>
 
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
-        {isMockMode && (
-          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
-            <h3 className="text-lg font-medium text-blue-900 mb-2">Demo Dashboard</h3>
-            <p className="text-blue-700">
-              This is your personalized dashboard. In the full version, you'll see real data including 
-              order history, ride bookings, wallet balance, and notifications.
-            </p>
-          </div>
-        )}
-
         {/* Quick Stats */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <div className="bg-white p-6 rounded-lg shadow-md">
@@ -119,7 +110,7 @@ export default function DashboardPage() {
               <div className="ml-4">
                 <p className="text-sm font-medium text-gray-600">Total Orders</p>
                 <p className="text-2xl font-semibold text-gray-900">
-                  {isMockMode ? '12' : '0'}
+                  12
                 </p>
               </div>
             </div>
@@ -133,7 +124,7 @@ export default function DashboardPage() {
               <div className="ml-4">
                 <p className="text-sm font-medium text-gray-600">Rides Taken</p>
                 <p className="text-2xl font-semibold text-gray-900">
-                  {isMockMode ? '8' : '0'}
+                  8
                 </p>
               </div>
             </div>
@@ -147,7 +138,7 @@ export default function DashboardPage() {
               <div className="ml-4">
                 <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
                 <p className="text-2xl font-semibold text-gray-900">
-                  KES {isMockMode ? '2,500' : '0'}
+                  KES 2,500
                 </p>
               </div>
             </div>
@@ -161,7 +152,7 @@ export default function DashboardPage() {
               <div className="ml-4">
                 <p className="text-sm font-medium text-gray-600">Notifications</p>
                 <p className="text-2xl font-semibold text-gray-900">
-                  {isMockMode ? '3' : '0'}
+                  3
                 </p>
               </div>
             </div>