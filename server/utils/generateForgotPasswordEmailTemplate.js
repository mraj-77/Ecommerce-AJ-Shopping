export const generateForgotPasswordEmailTemplate = (resetPasswordUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Your Password</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f5f7;
          font-family: Arial, Helvetica, sans-serif;
          color: #111827;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color: #f4f5f7; padding: 40px 15px;"
        >
          <tr>
            <td align="center">

              <!-- MAIN CONTAINER -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 580px;
                  background-color: #ffffff;
                  border-radius: 20px;
                  overflow: hidden;
                  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.08);
                "
              >

                <!-- TOP ACCENT -->
                <tr>
                  <td
                    style="
                      height: 5px;
                      background: linear-gradient(
                        90deg,
                        #111827 0%,
                        #7c3aed 50%,
                        #ec4899 100%
                      );
                    "
                  ></td>
                </tr>

                <!-- HEADER -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 38px 30px 28px;
                      background-color: #ffffff;
                    "
                  >

                    <!-- LOGO / ICON -->
                    <div
                      style="
                        width: 58px;
                        height: 58px;
                        margin: 0 auto 18px;
                        border-radius: 18px;
                        background: linear-gradient(
                          135deg,
                          #111827 0%,
                          #374151 100%
                        );
                        text-align: center;
                        line-height: 58px;
                        font-size: 25px;
                      "
                    >
                      🔐
                    </div>

                    <h1
                      style="
                        margin: 0;
                        font-size: 27px;
                        line-height: 1.25;
                        font-weight: 800;
                        color: #111827;
                        letter-spacing: -0.5px;
                      "
                    >
                      Reset your password
                    </h1>

                    <p
                      style="
                        margin: 10px 0 0;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #6b7280;
                      "
                    >
                      Let's get you back into your account.
                    </p>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 5px 35px 35px;">

                    <p
                      style="
                        margin: 0 0 18px;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #1f2937;
                      "
                    >
                      Hey there 👋
                    </p>

                    <p
                      style="
                        margin: 0 0 24px;
                        font-size: 15px;
                        line-height: 1.8;
                        color: #6b7280;
                      "
                    >
                      We received a request to reset the password for your
                      account. Click the button below to create a new password
                      and continue shopping with us.
                    </p>

                    <!-- SECURITY NOTICE -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        margin-bottom: 28px;
                        background-color: #faf5ff;
                        border: 1px solid #ede9fe;
                        border-radius: 12px;
                      "
                    >
                      <tr>
                        <td style="padding: 15px 16px;">

                          <table
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                          >
                            <tr>
                              <td
                                valign="top"
                                style="
                                  width: 32px;
                                  font-size: 17px;
                                  padding-right: 8px;
                                "
                              >
                                ⏳
                              </td>

                              <td
                                style="
                                  font-size: 13px;
                                  line-height: 1.6;
                                  color: #6d28d9;
                                "
                              >
                                <strong style="color: #5b21b6;">
                                  This link expires in 15 minutes.
                                </strong>
                                <br />
                                For your security, please reset your password
                                before the link expires.
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td align="center" style="padding: 5px 0 30px;">

                          <a
                            href="${resetPasswordUrl}"
                            target="_blank"
                            style="
                              display: inline-block;
                              padding: 15px 34px;
                              border-radius: 12px;
                              background: linear-gradient(
                                135deg,
                                #111827 0%,
                                #1f2937 100%
                              );
                              color: #ffffff;
                              text-decoration: none;
                              font-size: 15px;
                              font-weight: 700;
                              letter-spacing: 0.1px;
                            "
                          >
                            Reset My Password &nbsp;→
                          </a>

                        </td>
                      </tr>
                    </table>

                    <!-- DIVIDER -->
                    <div
                      style="
                        height: 1px;
                        background-color: #f1f5f9;
                        margin: 0 0 25px;
                      "
                    ></div>

                    <!-- DIDN'T REQUEST -->
                    <p
                      style="
                        margin: 0 0 18px;
                        font-size: 13px;
                        line-height: 1.7;
                        color: #9ca3af;
                      "
                    >
                      <strong style="color: #6b7280;">
                        Didn't request a password reset?
                      </strong>
                      <br />
                      No worries. Your password will remain unchanged. You can
                      safely ignore this email.
                    </p>

                    <!-- FALLBACK URL -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        background-color: #f8fafc;
                        border: 1px solid #e5e7eb;
                        border-radius: 12px;
                      "
                    >
                      <tr>
                        <td style="padding: 15px 16px;">

                          <p
                            style="
                              margin: 0 0 8px;
                              font-size: 11px;
                              font-weight: 700;
                              text-transform: uppercase;
                              letter-spacing: 0.7px;
                              color: #9ca3af;
                            "
                          >
                            Button not working?
                          </p>

                          <p
                            style="
                              margin: 0;
                              font-size: 12px;
                              line-height: 1.6;
                              word-break: break-all;
                            "
                          >
                            <a
                              href="${resetPasswordUrl}"
                              target="_blank"
                              style="
                                color: #7c3aed;
                                text-decoration: none;
                              "
                            >
                              ${resetPasswordUrl}
                            </a>
                          </p>

                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 25px 30px;
                      background-color: #fafafa;
                      border-top: 1px solid #f1f5f9;
                    "
                  >

                    <p
                      style="
                        margin: 0 0 8px;
                        font-size: 14px;
                        line-height: 1.5;
                        color: #374151;
                      "
                    >
                      Thanks for shopping with us 🛍️
                    </p>

                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        color: #9ca3af;
                      "
                    >
                      The AJ Shopping Team
                    </p>

                    <p
                      style="
                        margin: 12px 0 0;
                        font-size: 10px;
                        line-height: 1.5;
                        color: #b0b7c3;
                      "
                    >
                      This is an automated email. Please do not reply.
                    </p>

                  </td>
                </tr>

              </table>

              <!-- OUTSIDE FOOTER -->
              <p
                style="
                  margin: 18px 0 0;
                  font-size: 10px;
                  color: #9ca3af;
                  text-align: center;
                "
              >
                © ${new Date().getFullYear()} AJ Shopping. All rights reserved.
              </p>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};