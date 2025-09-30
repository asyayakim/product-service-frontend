import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { API_BASE_URL } from "../apiConfig";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    birthDay: "",
    termsAgreed: false,
    marketingAgreed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    
    if (!formData.termsAgreed) {
      setMessage("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const authResponse = await fetch(`${API_BASE_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.fullName.split(" ")[0],
          lastName: formData.fullName.split(" ")[1],
          birthday: formData.birthDay, 
        }),
      });
      const authData = await authResponse.json();
      
      if (!authResponse.ok) {
        setMessage(authData.message || "Registration failed");
        setIsLoading(false);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      
      <section id="register" className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute w-16 h-16 bg-blue-200 rounded-full opacity-50 top-20 left-10"></div>
        <div className="absolute w-24 h-24 bg-purple-200 rounded-full opacity-50 bottom-20 right-10"></div>
        <div className="absolute w-12 h-12 bg-yellow-100 rounded-full top-1/3 right-1/4 opacity-40"></div>
        <div className="absolute w-10 h-10 bg-pink-100 rounded-full top-1/2 left-1/3 opacity-40"></div>
        <div className="absolute w-20 h-20 bg-green-100 rounded-full top-40 right-40 opacity-30"></div>
        
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Create Your Account</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Create your account and start shopping with us. Join thousands of satisfied customers today.
            </p>
          </div>

          <div className="max-w-2xl mx-auto overflow-hidden bg-white border-2 rounded-2xl">
            <div className="p-8 sm:p-10">
              <form onSubmit={handleSubmit}>

                <div className="mb-6">
                  <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="birthDay" className="block mb-1 text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="birthDay"
                      name="birthDay"
                      className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      
                      value={formData.birthDay}
                      onChange={handleChange}
                      required
                      autoComplete="bday"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="At least 8 characters, one capital, one number and special symbol"
                        minLength={8}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                      />
                      <button 
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash className="w-5 h-5 text-gray-400" /> : <FaEye className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm your password"
                        minLength={8}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                      />
                      <button 
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash className="w-5 h-5 text-gray-400" /> : <FaEye className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      name="country"
                      className="w-full px-4 py-3 transition bg-white border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select your country</option>
                      <option value="no">Norway</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="jp">Japan</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="termsCheck"
                        name="termsAgreed"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={formData.termsAgreed}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="termsCheck" className="font-medium text-gray-700">
                        I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketingCheck"
                        name="marketingAgreed"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={formData.marketingAgreed}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketingCheck" className="font-medium text-gray-700">
                        I would like to receive marketing communications about products, services, and promotions
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isLoading 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>

                {message && (
                  <div className={`mb-6 p-3 rounded-lg text-center ${
                    message.includes("successful") 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {message}
                  </div>
                )}


                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-3">
                  <button 
                    type="button"
                    className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FaGoogle className="mr-2 text-red-500" />
                    <span className="font-medium">Google</span>
                  </button>
                  <button 
                    type="button"
                    className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FaFacebook className="mr-2 text-blue-600" />
                    <span className="font-medium">Facebook</span>
                  </button>
                  <button 
                    type="button"
                    className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FaApple className="mr-2 text-gray-800" />
                    <span className="font-medium">Apple</span>
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => navigate("/login")}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

   
    </main>
  );
}