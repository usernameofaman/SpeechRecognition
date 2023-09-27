import { toast } from "react-toastify";

export const formatCamelString = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const muiInputLengthLimit = (e) => {
  return Math.max(0, parseInt(e)).toString().slice(0, 4)
}

export const hasPermission = (permissions) => {
  let user = localStorage.getItem('userData')
  if (user) user = JSON.parse(user)
  let currentRole = user.role || "None";
  return permissions.indexOf(currentRole) > -1
}


export const getMuiDateNow = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate()
  let final = `${year}${month.toString().length === 1 ? '-0' : "-"}${month}-${date}`
  return final
}

export const timeAgoCalculator = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export const ScrollDivToBottom = () => {
  let obj = document.getElementById("scrollCustomerMessages")
  if (obj) {
    obj.scrollTop = 9999;
  }
}

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const showInfoMessage = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const doesUrlHas = (value) => {
  return window.location.pathname.includes(value)
}

export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const verifyLocalStorageObjectData = async (key) => {
  let data = {};
  if (localStorage.getItem(key)) data = JSON.parse(localStorage.getItem(key));
  return data;
};

export const makeid = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const FormatCurrency = (number) => {
  try {
    number = Math.round(number.toFixed(2));
    let indLocale = Intl.NumberFormat("en-IN");
    return indLocale.format(number);
  } catch {
    return 0
  }
};

export const CamelCaseToString = (name) => {
  const text = name;
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
