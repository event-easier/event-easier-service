import { SMTPClient } from 'emailjs';
import nodemailer from 'nodemailer';
import emailjs  from '@emailjs/nodejs'

export const sendEmail=  async data => {
  console.log("123",data.code);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'event.easier.911@gmail.com',
    to: data.data.email,
    subject: 'Test email from Node.js',
    html: htmlEmail(data.code),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
              message: "Email sent successfully",
            });
    }
  });
};



const htmlEmail = (code)=>{ return  (`
<div style="word-spacing: normal">
  <div>
    <div style="margin: 0px auto; max-width: 600px">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
        <tbody>
          <tr>
            <td style="
                direction: ltr;
                font-size: 0px;
                padding: 16px;
                text-align: center;
              ">
              <div class="m_-1333966480089494488mj-column-per-100" style="
                  font-size: 0px;
                  text-align: left;
                  direction: ltr;
                  display: inline-block;
                  vertical-align: top;
                  width: 100%;
                ">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align: top; padding: 0px">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="
                                  font-size: 0px;
                                  padding: 0px;
                                  padding-bottom: 32px;
                                  word-break: break-word;
                                ">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="float: none; display: inline-table">
                                  <tbody>
                                    <tr>
                                      <td style="
                                          padding: 0px;
                                          vertical-align: middle;
                                        ">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="
                                            border-radius: 3px;
                                            width: 24px;
                                          ">
                                          <tbody>
                                            <tr>
                                              <td style="
                                                  font-size: 0;
                                                  height: 24px;
                                                  vertical-align: middle;
                                                  width: 24px;
                                                ">
                                                <a href="https://lu.ma" target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1684329864248000&amp;usg=AOvVaw09tIB8PsVT3bvlSNMRKqXe">
                                                  <img height="24"
                                                    src="https://ci4.googleusercontent.com/proxy/fleVNv-FYPeYkx-4zhnEdfCL4hzN4_kqRqAnLHnEid6caAtqXiFMDdGgc7kwbE6c2BIVEid0lI8=s0-d-e1-ft#https://cdn.lu.ma/email/luma-star.png"
                                                    style="
                                                      border-radius: 3px;
                                                      display: block;
                                                    " width="24" class="CToWUd" data-bit="iit" />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="
                                  font-size: 0px;
                                  padding: 0px;
                                  padding-bottom: 20px;
                                  word-break: break-word;
                                ">
                                <div style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Helvetica, sans-serif;
                                    font-size: 28px;
                                    font-weight: 700;
                                    line-height: 1.6;
                                    text-align: left;
                                    color: #131517;
                                  ">
                                  ${code}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="
                                  font-size: 0px;
                                  padding: 0px;
                                  word-break: break-word;
                                ">
                                <div style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Helvetica, sans-serif;
                                    font-size: 16px;
                                    line-height: 1.6;
                                    text-align: left;
                                    color: #131517;
                                  ">
                                  is your Luma sign in code.
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="
                                  font-size: 0px;
                                  padding: 0px;
                                  padding-top: 24px;
                                  word-break: break-word;
                                ">
                                <div style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Helvetica, sans-serif;
                                    font-size: 14px;
                                    line-height: 1.6;
                                    text-align: left;
                                    color: #737577;
                                  ">
                                  <div>
                                    If you didn't attempt to sign in, you can
                                    safely ignore this email.
                                  </div>
                                  <div style="padding-top: 8px">
                                    You can also
                                    <a class="m_-1333966480089494488cta-link"
                                      href="https://lu.ma/reset-password?key=m14z608kf3tiro9pguwt" target="_blank"
                                      data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/reset-password?key%3Dm14z608kf3tiro9pguwt&amp;source=gmail&amp;ust=1684329864249000&amp;usg=AOvVaw0SW6oZ958gCY4XJb13XPOg">set
                                      a password</a>
                                    to sign in to your account.
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="
                                  font-size: 0px;
                                  padding: 0px;
                                  padding-top: 32px;
                                  word-break: break-word;
                                ">
                                <p style="
                                    border-top: solid 1px #ebeced;
                                    font-size: 1px;
                                    margin: 0px auto;
                                    width: 100%;
                                  "></p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin: 0px auto; max-width: 600px">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
        <tbody>
          <tr>
            <td style="
                direction: ltr;
                font-size: 0px;
                padding: 16px;
                text-align: center;
              ">
              <div class="m_-1333966480089494488mj-column-per-100" style="
                  font-size: 0px;
                  text-align: left;
                  direction: ltr;
                  display: inline-block;
                  vertical-align: top;
                  width: 100%;
                ">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td style="vertical-align: top; padding: 0px">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="
                                  font-size: 0px;
                                  padding: 0px;
                                  word-break: break-word;
                                ">
                                <div style="
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Helvetica, sans-serif;
                                    font-size: 16px;
                                    line-height: 1.6;
                                    text-align: left;
                                    color: #131517;
                                  ">
                                  <div>
                                    <div class="m_-1333966480089494488col-50" style="
                                        font-size: 0;
                                        text-align: left;
                                        display: inline-block;
                                        vertical-align: top;
                                        width: 100%;
                                        margin-bottom: 8px;
                                      ">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="vertical-align: top" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="
                                                font-size: 0;
                                                padding-right: 10px;
                                                word-break: break-word;
                                              ">
                                              <a href="https://lu.ma" target="_blank"
                                                data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1684329864249000&amp;usg=AOvVaw3pnA9D7SWwscVS4lzzEujj"><img
                                                  height="15" width="45"
                                                  src="https://ci5.googleusercontent.com/proxy/OT4HHwv-eHH3muHLOZL1jaMJSWSCwertxQIAliVyOF0eHoNasdlkgJwJT64fVj7xTgZ3=s0-d-e1-ft#https://cdn.lu.ma/email/logo.png"
                                                  class="CToWUd" data-bit="iit" /></a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div class="m_-1333966480089494488col-50" style="
                                        font-size: 0;
                                        text-align: left;
                                        display: inline-block;
                                        vertical-align: top;
                                        width: 100%;
                                        margin-bottom: 8px;
                                      ">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="vertical-align: top" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="
                                                font-size: 0;
                                                word-break: break-word;
                                              ">
                                              <div style="text-align: right">
                                                <a href="https://lu.ma" target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1684329864249000&amp;usg=AOvVaw3pnA9D7SWwscVS4lzzEujj"><img
                                                    width="16" height="16"
                                                    src="https://ci4.googleusercontent.com/proxy/fleVNv-FYPeYkx-4zhnEdfCL4hzN4_kqRqAnLHnEid6caAtqXiFMDdGgc7kwbE6c2BIVEid0lI8=s0-d-e1-ft#https://cdn.lu.ma/email/luma-star.png"
                                                    class="CToWUd" data-bit="iit" /></a>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <img alt=""
    src="https://ci6.googleusercontent.com/proxy/gZTBfOgWd1P47KEBLVlGNb4MFMYf_QQ5YeMdOlx3LthdCgL_W08o13aI6wSn_mz425KLI0vith0zWQdYxuUH1GEfIvBywYclA5jeHdVTJDn_YQsdr3vFcNiUs4wCz3f71-3_27iIpCbtuC3G5LwNaeCXvJGq-CbSslHLN6Havstb9LyWJ_KTDrp2WnmQJdZPfCVoi6JIcKr-_RNZ=s0-d-e1-ft#https://jm54dyh1.r.us-west-2.awstrack.me/I0/010101882488ef5e-aed68a82-1148-4705-9e5b-709c021fb94f-000000/S3pTthvnPiyfjXmwqUYapQYn9C8=322"
    style="display: none; width: 1px; height: 1px" class="CToWUd" data-bit="iit" />
  <div class="yj6qo"></div>
  <div class="adL"></div>
</div>
`);
}