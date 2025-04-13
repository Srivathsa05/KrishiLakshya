import React from "react";
import PersonalInfoForm from "./Personalnfoform";
import FarmDetailsForm from "./FarmDetailsForm";
import SecuritySettingsForm from "./securitysettings";
import PreferencesForm from "./PreferencesForm";

const Profile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-6">
        <PersonalInfoForm />
        <FarmDetailsForm />
        <SecuritySettingsForm />
        <PreferencesForm />
      </div>
    </div>
  );
};

export default Profile;
