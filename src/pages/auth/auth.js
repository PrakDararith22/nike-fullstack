import "./auth.css";
import "@components";
import { jordan, nike } from "@assets";
import { auth } from "@utility";

export function authPage(variant) {
  const content = {
    signin: {
      title: "Enter your email to join us or sign in.",
      text: "Gatar",
      agreement:
        "By creating an account, I agree to Nike's <a>Privacy Policy</a> and <a>Terms of Use</a>",
      buttonText: "Continue",
      searchPlaceHolder: "Email*",
    },
    password: {
      title: "What's your password?",
      text: "prakdararith22@gmail.com <a>Edit</a>",
      agreement: "<a>Forgot password</a>",
      buttonText: "Sign in",
      searchPlaceHolder: "Password*",
    },
    reset: {
      title: "Verify your email and enter a new password.",
      text: "prakdararith22@gmail.com <a>Edit</a>",
      buttonText: "save",
      secondaryButtonText: "save",
      searchPlaceHolder: "Code*",
      secondarysearchPlaceHolder: "New Password*",
    },
  };

  document.addEventListener("base-button", event => {
    const actions = event.detail.action;
    const searchInputs = document.querySelectorAll(".auth-page-container search-input");
    const values = {};

    searchInputs.forEach(input => {
      values[input.getAttribute("text").replace(/\*/g, "").trim()] = input.getValue();
    });

    if (actions === "signin") {
      sessionStorage.setItem("authEmail", values.Email);

      if (auth.getUsers().find(item => item.email === values.Email)) {
        window.location.href = "/password";
      } else {
        console.log("User not found");
      }
    }

    if (actions === "password") {
      const email = sessionStorage.getItem("authEmail") || values.Email;

      if (auth.login(email, values.Password)) {
        sessionStorage.removeItem("authEmail");
        window.location.href = "/";
      }
    }
  });

  const storedEmail = sessionStorage.getItem("authEmail");

  if (variant === "password" && storedEmail) {
    content.password.text = `${storedEmail} <a>Edit</a>`;
  }

  return /* html */ `
    <div class="bg-white">
      <div class="auth-page-container pt-8 mx-auto flex flex-col gap-12">
        
        <!-- icon section -->
        <div class="flex gap-6 pl-2">
          <icon-button icon="${nike}" size="2"></icon-button>
          <icon-button icon="${jordan}" size="1.5"></icon-button>
        </div>
        
        <!-- title section -->
        <div>
          <p class="font-light text-h2 pb-4">
            ${content[variant].title}
          </p>
          <p>${content[variant].text}</p>
        </div>
        
        <!-- input section -->
        <div>
          <search-input text="${content[variant].searchPlaceHolder}" type="input"></search-input>
          ${variant === "reset" ? `<search-input text="${content[variant].secondarysearchPlaceHolder}" type="input"></search-input>` : ""}
        </div>
        
        <!-- agreement section -->
        <div class="text-p1 text-gray-800">
          ${content[variant].agreement || ""}
        </div>
        
        <!-- button section -->
        <div class="flex gap-2 align-self-end">
          <base-button
            text="${content[variant].buttonText}"
            size="medium"
            action="${variant}"
          ></base-button>
          ${
            variant === "reset"
              ? `<base-button
                  text="${content[variant].secondaryButtonText}"
                  size="medium"
                  action="reset-secondary"
                ></base-button>`
              : ""
          }
        </div>
        
      </div>
    </div>
  `;
}
