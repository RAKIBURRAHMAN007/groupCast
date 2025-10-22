// components/Profile/Profile.tsx
import { useContext, useState, useRef } from "react";
import { updateProfile } from "firebase/auth";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
} from "react-icons/fa";
import { AuthContext } from "../../../../contexts/AuthContext";

const Profile = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    photoURL: user?.photoURL || "",
  });

  // Handle camera icon click
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, photoURL: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      setIsEditing(false);
      setImagePreview(null); // Clear preview after save
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      photoURL: user?.photoURL || "",
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  // Determine which image to display
  const displayImage = imagePreview || user?.photoURL;

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-800">
      {/* Header */}
      <div className="p-6 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaEdit size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaTimes size={16} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <FaSave size={16} />
                <span>{loading ? "Saving..." : "Save"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-yellow-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 overflow-hidden">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser size={48} />
                )}
              </div>
              {isEditing && (
                <>
                  <button
                    onClick={handleCameraClick}
                    className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full border border-gray-600 hover:bg-gray-700 transition-colors"
                  >
                    <FaCamera className="text-yellow-600" size={16} />
                  </button>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              )}
            </div>
            <h2 className="text-xl font-semibold text-white text-center">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="bg-gray-700 text-white text-center px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                  placeholder="Enter your name"
                />
              ) : (
                user?.displayName || "User"
              )}
            </h2>
            <p className="text-gray-400 text-center mt-1">{user?.email}</p>
          </div>

          {/* Profile Information */}
          <div className="bg-gray-900 rounded-xl p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <label className="text-gray-400 text-sm">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                    disabled // Email can't be changed easily in Firebase Auth
                  />
                ) : (
                  <p className="text-white">{user?.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <label className="text-gray-400 text-sm">Display Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) =>
                      setFormData({ ...formData, displayName: e.target.value })
                    }
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                    placeholder="Enter your display name"
                  />
                ) : (
                  <p className="text-white">{user?.displayName || "Not set"}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <FaPhone className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <label className="text-gray-400 text-sm">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="text-white">{user?.phoneNumber || "Not set"}</p>
                )}
              </div>
            </div>

            {/* Photo URL Field - Alternative manual URL input */}
            {isEditing && (
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                  <FaCamera className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <label className="text-gray-400 text-sm">
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    value={formData.photoURL}
                    onChange={(e) => {
                      setFormData({ ...formData, photoURL: e.target.value });
                      setImagePreview(e.target.value); // Update preview when URL changes
                    }}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-yellow-600 focus:outline-none"
                    placeholder="Enter image URL or upload image"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Or click the camera icon to upload an image
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Image Upload Instructions */}
          {isEditing && (
            <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4 mt-4">
              <h4 className="text-blue-400 font-semibold mb-2">Image Upload</h4>
              <ul className="text-blue-300 text-sm space-y-1">
                <li>• Click the camera icon to upload from your device</li>
                <li>• Supported formats: JPG, PNG, GIF</li>
                <li>• Maximum file size: 5MB</li>
                <li>• Or paste an image URL in the field above</li>
              </ul>
            </div>
          )}

          {/* Account Stats */}
          <div className="bg-gray-900 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">12</p>
                <p className="text-gray-400 text-sm">Groups</p>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">47</p>
                <p className="text-gray-400 text-sm">Tasks</p>
              </div>
            </div>
          </div>

          {/* Account Creation Info */}
          <div className="bg-gray-900 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Account Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Created</span>
                <span className="text-white">
                  {user?.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Sign In</span>
                <span className="text-white">
                  {user?.metadata.lastSignInTime
                    ? new Date(
                        user.metadata.lastSignInTime
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Email Verified</span>
                <span
                  className={`font-semibold ${
                    user?.emailVerified ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user?.emailVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
