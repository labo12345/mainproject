@@ .. @@
 import CartPage from './pages/CartPage';
 import DashboardPage from './pages/DashboardPage';
+import ConnectionTestPage from './pages/ConnectionTestPage';
 import { AuthProvider } from './contexts/AuthContext';
 import { Toaster } from 'react-hot-toast';
 
@@ -28,6 +29,7 @@ function App() {
             <Route path="/errands" element={<ErrandsPage />} />
             <Route path="/cart" element={<CartPage />} />
             <Route path="/dashboard" element={<DashboardPage />} />
}
+            <Route path="/connection-test" element={<ConnectionTestPage />} />
           </Routes>
           <Footer />
         </div>