import "./auth.css";
import "@components";
import { jordan, nike } from "@assets";

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

  return /* html */ `
    <div class="bg-white">
        <div class="auth-page-container pt-8 mx-auto flex flex-col gap-12">

            <!-- icon section -->
            <div class="flex gap-6 pl-2">
                <icon-button icon="${nike}" size="2"></icon-button>
                <icon-button icon="${jordan}" size="1.5"></icon-button>
            </div>

             <!-- title section -->
            <div >
                <p class="font-light text-h2 pb-4">
                ${content[variant].title}
                </p>
                <p>${content[variant].text}</p>
            </div>

             <!-- input section -->
            <div>
                <search-input text="${content[variant].searchPlaceHolder}" type="input"></search-input>
                ${variant === "reset" ? "<search-input></search-input>" : " "}
            </div>

             <!-- agreement section -->
            <div class="text-p1 text-gray-800">
              ${content[variant].agreement || ""}
            </div>

             <!-- button section -->
            <div  class="flex gap-2 align-self-end">
                <base-button text="${content[variant].buttonText}" size="medium"></base-button>
                ${variant === "reset" ? `<base-button variant="${content[variant].secondarysearchPlaceHolder}" text="${content[variant].secondaryButtonText}"></base-button>` : ""}
            </div>

        </div>
    <div>
  `;
}
