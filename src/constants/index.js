/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

export const httpConstants = {
  METHOD_TYPE: {
    POST: "POST",
    PUT: "PUT",
    GET: "GET",
    DELETE: "DELETE",
  },
  CONTENT_TYPE: {
    APPLICATION_JSON: "application/json",
    MULTIPART_FORM_DATA: "multipart/form-data",
    APPLICATION_FORM_URLENCODED: "application/x-www-form-urlencoded",
    IMAGE_PNG: "image/png",
  },
  DEVICE_TYPE: {
    WEB: "web",
  },
  API_END_POINT: {
    FORGOT_PASSWORD: "/forgot-password",
    ADD_USER: "/add-user",
    GET_USERS_LIST: "/get-users-list",
    GEY_USERS_BY_ROLE: "/get-users-by-role",
    GET_USER: "/get-user",
    ASSIGN_ENTITY: "assign-entity-to-clinic",
    ADD_ADMIN: "/add-admin",
    CHANGE_PASSWORD: "/change-password",
  },
};

export const cookiesConstants = {
  USER_ID: "userId",
  DEVICE_ID: "deviceId",
  SESSION_TOKEN: "sessionToken",
  ACCESS_TOKEN: "accessToken",
  ID_TOKEN: "idToken",
  EXPIRES_AT: "expiresAt",
  USER: "user",
  COMPANY: "company",
  USER_META_DATA: "userMetaData",
  USER_DETAILS: "userDetails",
  USER_ROLE: "userRole",
};

export const eventConstants = {
  SHOW_LOADER: "SHOW_LOADER",
  HIDE_LOADER: "HIDE_LOADER",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  CURRENT_CLINIC_ID: "CURRENT_CLINIC_ID",
};

export const pathConstants = {
  DASHBOARD_MENU: {
    CLINICS: "/dashboard/clinics",
    USERS: "/dashboard/users",
    DEVICES: "/dashboard/devices",
    FIRMWARES: "/dashboard/firmware",
    CONTENT: "/dashboard/content",
    DOCTORS: "/clinic-admin/dashboard/doctors",
    PATIENTS: "/clinic-admin/dashboard/patients",
    CLINIC_ADMIN_DEVICES: "/clinic-admin/dashboard/devices",
  },
};

export const userRoles = {
  SUPER_ADMIN: "rol_OJ7Enx7Ma1Zpig2o",
  CLINIC_ADMIN: "rol_bdK6jgOBZTnS4Ih6",
  SUB_ADMIN: "rol_SlFhkCSmbve6DDY8",
  DOCTOR: "rol_cIl1X6DqOb7J1Ip0",
  CONTENT_ADMIN: "rol_wAdWOPpwwZLV7Gbf",
};
export const userStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};
export const genericConstants = {
  LOGIN_SUCCESSFULL: "Login Successful",
  INCORRECT_USERNAME_PASS: "Incorrect username or password.",
  INVALID_EMAIL: "Email is not valid!",
  DO_NOT_HAVE_PERMISSION: "You Do Not Have Permission",
  CANT_GET_USER_DETAILS: "Can't Get User Details",
};
export const acceptedFileTypes = {
  VIDEO_COMMON: "video/mp4,video/x-m4v,video/*",
  DOCUMENTS_COMMON: "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*",
};
export const mediaTypes = {
  LOWER_OD: "Lower OD",
  LOWER_OS: "Lower OS",
  UPPER_OD: "Upper_OD",
  UPPER_OS: "Upper_OS",
};

export const carsColors = ["White", "Black", "Gray", "Silver", "Red", "Blue", "Brown", "Green", "Beige", "Orange", "Gold", "Yellow", "Purple"];
export const entities = ["BIMCAR", "SPL1", "SPL2", "Others"];
export const purpose = ["PURCHASE", "LEASE", "SALE", "BIMCARE","LEASE OUT",];
export const enquiryTypes = {
  PURCHASE: "SALE",
  LEASE: "LEASE",
  SALE: "PURCHASE",
  BIMCARE: "BIMCARE",
};


export const reportTypes = [
  { name: "customerIdentified", label: "Customer identified" },
  { name: "carsBooked", label: "Cars booked" },
  { name: "carPurchased", label: "Cars Sold " },
  { name: "carsAvailableThisMonth", label: "Cars likely to be available this month" },
  { name: "registrationExpiry", label: "Registration expiring" },
  { name: "policyExpiring", label: "Policy expiring" },
  { name: "serviceDue", label: "Service Dues" },
  { name: "oilChangeDue", label: "Oil Change Dues" },
  { name: "pendingLease", label: "Pending Lease Payment" },
  { name: "generatedQuotations", label: "Generated Quotations" },
];

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const crmCustomerDataPurchase = {
  "Customer Name": "fullName",
  "Contact No": "mobileNumber",
  Purpose: "purpose",
  "Car Vintage": "carVintage",
  Make: "make",
  Model: "model",
  Variant: "variant",
  "Customer Note": "customerNote",
};
export const crmCustomerDataSale = {
  "Customer Name": "fullName",
  "Contact No": "mobileNumber",
  Purpose: "purpose",
  "Car Vintage": "carVintage",
  Make: "make",
  Model: "model",
  Variant: "variant",
  "Customer Note": "customerNote",
  "Car Registration Number": "registrationNo",
  "City Registered": "cityRegistered",
  "KM Done": "kmDone",
  "Ownership": "ownership",
  "Expected Price": "expectedPrice",
  "Accidental": "accidental"
};
export const crmCustomerDataGeneral = {
  "Customer Name": "fullName",
  "Contact No": "mobileNumber",
  Purpose: "purpose",
};
export const crmCustomerDataHeightTable = {
  "SALE": "200px",
  "PURCHASE": "130px"
};

export const APPLICATION_STATUS = {
  ACQUISITION: "Acquisition",
  MOVED_TO_INVENTORY: "Inventory",
  SOLD: "Sold Cars",
  LEASE_SUMMARY: "Lease Summmary",
  LEASE_FINANCIALS: "LEASE_FINANCIALS",
  ALL_CARS: "All Cars",
  LEASE_REQUEST: "Lease Financials",
  QUOTATION: "Quotations",
  QUOTATION_DISCARDED: "QUOTATION_DISCARDED"
}

export const fileUploadInputs = [
  { id : "interiorImage", name : "Interior Image" },
  { id : "exteriorImage", name : "Exterior Image" },
  { id : "sideImage", name : "Side Image" },
  { id : "rearImage", name : "Rear Image" },
]