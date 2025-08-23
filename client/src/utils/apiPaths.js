const BASE_URL =
  "https://canovaforms-backend.onrender.com/api";
export const CLIENT_URL =
  "https://canova-forms-frontend.vercel.app";

// const BASE_URL = "http://localhost:3000/api";
// export const CLIENT_URL = "http://localhost:5173";

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    SEND_RESET_OTP: `${BASE_URL}/auth/send-reset-password-otp`,
    VERIFY_RESET_OTP: `${BASE_URL}/auth/verify-reset-otp`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  },
  USER: {
    GET_USER: `${BASE_URL}/user/get-user`,
    UPLOAD_PROFILE_PICTURE: `${BASE_URL}/user/upload-profile-picture`,
    UPDATE_PROFILE: `${BASE_URL}/user/update-profile`,
  },
  PROJECTS: {
    CREATE_PROJECT: `${BASE_URL}/project/create`,
    DELETE_PROJECT: (projectId) =>
      `${BASE_URL}/project/delete/${projectId}`,
    SHARE_PROJECT: (projectId) =>
      `${BASE_URL}/project/share/${projectId}`,
    GET_SHARED_PROJECTS: `${BASE_URL}/project/share/get-shared-projects`,
    UPDATE_PROJECT: (projectId) =>
      `${BASE_URL}/project/update/${projectId}`,
    GET_ALL_PROJECT: `${BASE_URL}/project/all`,
    GET_PROJECT_BY_PROJECTID: (projectId) =>
      `${BASE_URL}/project/${projectId}`,
  },
  FORMS: {
    GET_ALL_FORMS: `${BASE_URL}/form/all-forms`,
    RENAME_FORM: (formId) =>
      `${BASE_URL}/form/update-form/${formId}`,
    SAVE_FORM: (formId) =>
      `${BASE_URL}/form/save-form/${formId}`,
    GET_FORMS_INSIDE_PROJECT: (projectId) =>
      `${BASE_URL}/form/${projectId}`,
    DELETE_FORM: (formId) =>
      `${BASE_URL}/form/delete/${formId}`,
    DELETE_PAGE_FROM_FORM: (formId, pageId) =>
      `${BASE_URL}/form/${formId}/delete-page/${pageId}`,
    SHARE_FORM: (formId) =>
      `${BASE_URL}/form/share-form/${formId}`,
    GET_SHARED_FORMS: `${BASE_URL}/form/share/get-shared-forms`,
    ADD_PAGE: (formId) =>
      `${BASE_URL}/form/${formId}/add-page`,
    GET_FORM_BY_FORMID: (formId) =>
      `${BASE_URL}/form/get-form/${formId}`,
    CREATE_FORM: `${BASE_URL}/form/create-form`,
    ADD_CONDITION: (formId) =>
      `${BASE_URL}/form/add-condition/${formId}`,
    PUBLISH_FORM: (formId) =>
      `${BASE_URL}/form/publish-form/${formId}`,
    MOVE_FORM_TO_PROJECT: (formId) =>
      `${BASE_URL}/form/move-form-to-project/${formId}`,
  },
  MEDIA: {
    UPLOAD_MEDIA: `${BASE_URL}/media/upload`,
  },
};
