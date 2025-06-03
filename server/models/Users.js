import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format"
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false // Never return password in queries
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    accountLockedUntil: {
      type: Date,
      default: null
    },
    lastLogin: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password; // Always remove password from JSON output
        delete ret.__v;     // Remove version key
      }
    }
  }
);

// Password hashing middleware
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to reset failed attempts
UserSchema.methods.resetLoginAttempts = function() {
  this.failedLoginAttempts = 0;
  this.accountLockedUntil = null;
  return this.save();
};

// Method to handle failed login
UserSchema.methods.failedLogin = function() {
  this.failedLoginAttempts += 1;
  
  // Lock account after 3 failed attempts for 30 minutes
  if (this.failedLoginAttempts >= 3) {
    this.accountLockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  }
  
  return this.save();
};

// Static method to check if account is locked
UserSchema.methods.isAccountLocked = function() {
  return this.accountLockedUntil && this.accountLockedUntil > new Date();
};

export default mongoose.model("User", UserSchema);