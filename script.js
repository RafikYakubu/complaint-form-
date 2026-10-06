const form = document.getElementById("form");

const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const orderNo = document.getElementById("order-no");
const productCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");

const complaintsGroup = document.getElementById("complaints-group");
const complaints = document.querySelectorAll(
  '#complaints-group input[type="checkbox"]'
);
const otherComplaint = document.getElementById("other-complaint");
const complaintDescription = document.getElementById(
  "complaint-description"
);

const solutionsGroup = document.getElementById("solutions-group");
const solutions = document.querySelectorAll(
  '#solutions-group input[type="radio"]'
);
const otherSolution = document.getElementById("other-solution");
const solutionDescription = document.getElementById(
  "solution-description"
);



function validateForm() {
  const complaintsChecked = [...complaints].some(
    checkbox => checkbox.checked
  );

  const solutionChecked = [...solutions].some(
    radio => radio.checked
  );

  return {
    "full-name": fullName.value.trim() !== "",

    "email": email.validity.valid && email.value.trim() !== "",

    "order-no": /^2024\d{6}$/.test(orderNo.value),

    "product-code": /^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$/.test(
      productCode.value
    ),

    "quantity":
      quantity.value !== "" &&
      Number.isInteger(Number(quantity.value)) &&
      Number(quantity.value) > 0,

    "complaints-group": complaintsChecked,

    "complaint-description":
      !otherComplaint.checked ||
      complaintDescription.value.length >= 20,

    "solutions-group": solutionChecked,

    "solution-description":
      !otherSolution.checked ||
      solutionDescription.value.length >= 20
  };
}



function isValid(validation) {
  return Object.values(validation).every(value => value === true);
}



function validateField(field, valid) {
  field.style.borderColor = valid ? "green" : "red";
}



fullName.addEventListener("change", () => {
  const result = validateForm();
  validateField(fullName, result["full-name"]);
});

email.addEventListener("change", () => {
  const result = validateForm();
  validateField(email, result.email);
});

orderNo.addEventListener("change", () => {
  const result = validateForm();
  validateField(orderNo, result["order-no"]);
});

productCode.addEventListener("change", () => {
  const result = validateForm();
  validateField(productCode, result["product-code"]);
});

quantity.addEventListener("change", () => {
  const result = validateForm();
  validateField(quantity, result.quantity);
});


complaints.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const result = validateForm();

    complaintsGroup.style.borderColor = result["complaints-group"]
      ? "green"
      : "red";

   
    if (otherComplaint.checked) {
      complaintDescription.style.borderColor =
        result["complaint-description"] ? "green" : "red";
    }
  });
});



complaintDescription.addEventListener("change", () => {
  const result = validateForm();

  if (otherComplaint.checked) {
    validateField(
      complaintDescription,
      result["complaint-description"]
    );
  }
});



solutions.forEach(radio => {
  radio.addEventListener("change", () => {
    const result = validateForm();

    solutionsGroup.style.borderColor = result["solutions-group"]
      ? "green"
      : "red";


    if (otherSolution.checked) {
      solutionDescription.style.borderColor =
        result["solution-description"] ? "green" : "red";
    }
  });
});



solutionDescription.addEventListener("change", () => {
  const result = validateForm();

  if (otherSolution.checked) {
    validateField(
      solutionDescription,
      result["solution-description"]
    );
  }
});



form.addEventListener("submit", event => {
  event.preventDefault();

  const validation = validateForm();


  const valid = isValid(validation);

  if (valid) {
    document.getElementById("message-box").textContent =
      "Form submitted successfully!";
    return;
  }


  fullName.style.borderColor = validation["full-name"]
    ? ""
    : "red";

  email.style.borderColor = validation.email
    ? ""
    : "red";

  orderNo.style.borderColor = validation["order-no"]
    ? ""
    : "red";

  productCode.style.borderColor = validation["product-code"]
    ? ""
    : "red";

  quantity.style.borderColor = validation.quantity
    ? ""
    : "red";

  complaintsGroup.style.borderColor = validation["complaints-group"]
    ? ""
    : "red";

  complaintDescription.style.borderColor =
    validation["complaint-description"] ? "" : "red";

  solutionsGroup.style.borderColor = validation["solutions-group"]
    ? ""
    : "red";

  solutionDescription.style.borderColor =
    validation["solution-description"] ? "" : "red";

  document.getElementById("message-box").textContent =
    "Please correct the invalid fields.";
});