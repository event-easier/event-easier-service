import { SMTPClient } from "emailjs";
import nodemailer from "nodemailer";
import emailjs from "@emailjs/nodejs";
import ical from "ical-generator";

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "event.easier.911@gmail.com",
    to: data.data.email,
    subject: data.code + " is your Luma sign in code",
    html: htmlEmailCodeVerify(data.code),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({
        message: "Email sent successfully",
      });
    }
  });
};

export const sendEmailInvited = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "event.easier.911@gmail.com",
    to: data.email,
    replyTo: data.host,
    subject: "You are invited to " + data.data.name,
    html: htmlEmailInvited(data),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({
        message: "Email sent successfully",
      });
    }
  });
};

export const registrationConfirmed = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const cal = ical({
    domain: "https://event-easier.vercel.app/",
    name: "Events Easier",
    timezone: "America/Los_Angeles",
    method: "REQUEST",
    events: [
      {
        start: data.data.start_time,
        end: data.data.end_time,
        summary: data.data.name,
        description: "you have registered for " + data.data.name,
        location: data.data.type.location || null,
        organizer: {
          name: data.hostName || "ban tổ chức",
          email: data.hostEmail,
        },
        attendees: [
          {
            name: "Bạn",
            email: data.email,
            rsvp: true,
          },
        ],
      },
    ],
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: data.data.name,
    html: htmlEmailConfirm(data),
    icalEvent: {
      filename: "event.ics",
      method: "REQUEST",
      content: new TextEncoder().encode(cal.toString()),
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const notification = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Invite accepted to " + data.user.name,
    html: htmlEmailNotification(data),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const thank = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    subject: "Cảm ơn bạn đã tham gia " + data.data.name,
    text: "Nội dung email",
    html: htmlThank(data),
  };

  let recipients = data.data.guests.map((guest) => guest.gmail);
  recipients.forEach((recipient) => {
    mailOptions.to = recipient;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Gửi email thất bại: " + error);
      } else {
        console.log("Email đã được gửi thành công: " + info.response);
      }
    });
  });
};

const htmlEmailCodeVerify = (code) => {
  return `
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
                                  is your Events Easier sign in code.
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
`;
};

const htmlEmailInvited = (data) => {
  return `
<div style="word-spacing:normal">
    
    
      <div>

      
      <div style="margin:0px auto;max-width:600px">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
                
            
      <div class="m_-7274134027962948929mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td style="vertical-align:top;padding:0px">
              
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-bottom:32px;word-break:break-word">
                  
      
     
              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                <tbody>
                  
      <tr>
        <td style="padding:0px;vertical-align:middle">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px">
            <tbody>
              <tr>
                <td style="font-size:0;height:24px;vertical-align:middle;width:24px">
                  <a href="https://lu.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1685110880822000&amp;usg=AOvVaw3sRQqs6hjYckDNh6avVTPI">
                    <img height="24" src="https://ci4.googleusercontent.com/proxy/fleVNv-FYPeYkx-4zhnEdfCL4hzN4_kqRqAnLHnEid6caAtqXiFMDdGgc7kwbE6c2BIVEid0lI8=s0-d-e1-ft#https://cdn.lu.ma/email/luma-star.png" style="border-radius:3px;display:block" width="24" class="CToWUd" data-bit="iit">
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
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><h1 style="margin-top:0;margin-bottom:4px;font-size:24px;line-height:32px"><div style="font-weight:normal;color:#b3b5b7">Please join me at</div><b>${
        data.data.name
      }</b></h1></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:0px;padding-top:16px;padding-bottom:16px;word-break:break-word">
                  
      <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
      </p>
      
      
    
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-top:8px;padding-bottom:16px;word-break:break-word">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
        <tbody>
          <tr>
            <td style="width:568px">
              
      <img src=${
        data.data.cover
      } style="border:0;border-radius:10px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:16px" width="568" height="auto" class="CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 670.8px; top: 430.8px;"><div id=":se" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Tải xuống tệp đính kèm " jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc2Njg3NjIyNzA1OTc5NTEyNSIsbnVsbCxbXV0." data-tooltip-class="a1V" data-tooltip="Tải xuống"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div>
    
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517">
      <table>
      <tbody>
      <tr>
      <td style="padding-bottom:8px">
      <table border="0">
      <tbody>
      <tr>
      <td style="vertical-align:middle;width:40px;height:40px;padding:0">
      <table width="40" cellspacing="0" cellpadding="0" border="0" style="border-spacing:0;border-collapse:separate">
      <tbody>
      <tr>
      <td style="padding:0;margin:0;background-color:#eceded!important;border:1px solid #eceded;font-size:8px!important;line-height:2!important;border-top-right-radius:8px;border-top-left-radius:8px" valign="middle" align="center">
      <span style="color:#737577!important;font-size:8px!important;line-height:2!important;font-weight:500">
      ${new Date(data.data.start_time).toLocaleString("default", {
        month: "long",
      })}
      </span>
      </td>
      </tr>
      <tr>
      <td style="padding:0;margin:0;background-color:#ffffff;border:1px solid #eceded;border-bottom-right-radius:8px;border-bottom-left-radius:8px;font-size:16!important;line-height:1.5!important" valign="top" align="center">
      <span style="font-size:16!important;line-height:1.5!important;font-weight:500;color:#737577">
      ${new Date(data.data.start_time).toLocaleString("default", {
        day: "numeric",
      })}
      </span>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      <td style="vertical-align:middle;padding-left:12px">
      <div>
      <div style="font-size:16px;color:#131517;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
      ${new Date(data.data.start_time).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      </div>
      <div style="font-size:14px;color:#737577;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
     ${data.data.start_time}
      </div>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
${
  data.data.type.event_type === "IN_PERSON"
    ? '<tr><td><table border="0"><tbody><tr><td style="vertical-align:middle;width:40px;height:40px;padding:0"><table border="0" style="padding:0;border-collapse:separate;border-spacing:0"><tbody><tr><td style="border:1px solid #eceded;vertical-align:middle;width:40px;height:40px;border-radius:8px" align="center"><img style="display:block" src="https://ci6.googleusercontent.com/proxy/n9tgTMYsugezBKsLlCsgZJ1aEFtZNQnfqhFcTHyWVunSlEY0PdYW3aWumVCZhP0MDzL--TJo8Wps1avY52kMXhK-0g3iA-Mmz5r5r3UwWUD0ZFo1-fyBJbh6Y23qA4Vm58oJrGK6YcxxUW1bGEACg9LCQoqPcaba9r0YFfV9jBnmEaTN45lFHwvSdrdnozmvGtURVh_nKWeobA=s0-d-e1-ft#https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=85,width=40,height=40/misc/3k/95610a7f-2391-4002-9779-a1e9bfb7216c" width="20" height="20" class="CToWUd" data-bit="iit"/></td></tr></tbody></table></td><td style="vertical-align:middle;padding-left:12px"><a href="https://www.google.com/maps/search/?api=1&amp;query=' +
      encodeURIComponent(data.data.type.location) +
      '" style="display:block;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.google.com/maps/search/?api%3D1%26query%3D' +
      encodeURIComponent(data.data.type.location) +
      'query_place_id%3DEkoxMjgvMzJiIELDuWkgUXVhbmcgTMOgLCBQaMaw4budbmcgMTIsIEfDsiBW4bqlcCwgSG8gQ2hpIE1pbmggQ2l0eSwgVmlldG5hbSIxEi8KFAoSCfcHlY13KXUxEdi72jL_3HpkEIABKhQKEgnF8icTeCl1MRFfHz3YZGC6Pw&amp;source=gmail&amp;ust=1685110880822000&amp;usg=AOvVaw1Lh87NNLeNsdvhIxyizQGH"><div><div style="font-size:16px;color:#131517;font-weight:500">' +
      data.data.type.location +
      ' ↗</div><div style="font-size:14px;color:#737577;font-weight:400"> ----------- </div></div></a></td></tr></tbody></table></td></tr>'
    : '<td><table border="0"><tbody><tr><td style="vertical-align:middle;width:40px;height:40px;padding:0"><table border="0" style="padding:0;border-collapse:separate;border-spacing:0"><tbody><tr><td style="border:1px solid #eceded;vertical-align:middle;width:40px;height:40px;border-radius:8px" align="center"><img style="display:block" src="https://ci3.googleusercontent.com/proxy/GYJcRDbnw3Y3_7dpkLzhYvO6W-RxJ2dYxxETi4RAenh8bt5_gLV4tDMW69FIwE958QSAeesorfTaDDOGk1Gmo8DKgbt2hUTIEUy11Eo4Y6sGbZ2jZ8Gil707JV5-1GLI2hXunPNdzVMWubVATJZzkab1znz6g0OQUY8VKTBo0QvabgkQUSeyotaVPXYU7t0fFD6t1krEs_aQzQ=s0-d-e1-ft#https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=85,width=40,height=40/misc/20/04a81bba-a20c-49c2-85bc-568cbcebe1a0" width="20" height="20" class="CToWUd" data-bit="iit"/></td></tr></tbody></table></td><td style="vertical-align:middle;padding-left:12px"><div style="font-size:16px;color:#131517;font-weight:500">' +
      data.data.type.event_type +
      "</div></td></tr></tbody></table></td>"
}    
      </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:0px;padding-top:16px;padding-bottom:16px;word-break:break-word">
                  
      <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
      </p>
      
      
    
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><div><div class="m_-7274134027962948929mirror-content"><p>${
        data.message
      }</p></div></div></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-top:24px;word-break:break-word">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%">
        <tbody>
          <tr>
            <td align="center" bgcolor="#de3163" role="presentation" style="border:none;border-radius:8px;background:#de3163" valign="middle">
              <a href="https://lu.ma/event/evt-fZ6iDctVGxRe4jU?action=accept&amp;pk=g-RCwCboXsIsBBRDX" style="display:inline-block;background:#de3163;color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;font-weight:700;line-height:1;margin:0;text-decoration:none;text-transform:none;padding:12px 24px;border-radius:8px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/event/evt-fZ6iDctVGxRe4jU?action%3Daccept%26pk%3Dg-RCwCboXsIsBBRDX&amp;source=gmail&amp;ust=1685110880822000&amp;usg=AOvVaw3zI2vynfqUIOAtOUL7IfWu">
                Accept Invite
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-top:24px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:14px;line-height:1.6;text-align:left;color:#737577">Can't make it? <a href="https://lu.ma/event/evt-fZ6iDctVGxRe4jU?action=decline&amp;pk=g-RCwCboXsIsBBRDX" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/event/evt-fZ6iDctVGxRe4jU?action%3Ddecline%26pk%3Dg-RCwCboXsIsBBRDX&amp;source=gmail&amp;ust=1685110880822000&amp;usg=AOvVaw1SnV5amrIUWuzPWvsNXAT-">Decline the invite</a> to stop receiving emails about this event.</div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-top:32px;padding-bottom:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:12px;font-weight:500;line-height:1.6;text-align:left;color:#b3b5b7">Share with friends</div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-bottom:8px;word-break:break-word">
                  
      
     
              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                <tbody>
                  
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:middle">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
            <tbody>
              <tr>
                <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
                  <a href="https://lu.ma/social-share?m=join-event&amp;n=test&amp;pa=i5rpb4v4&amp;p=fb" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3Dtest%26pa%3Di5rpb4v4%26p%3Dfb&amp;source=gmail&amp;ust=1685110880823000&amp;usg=AOvVaw39YBcXh9_SiEXKdXhfdmlT">
                    <img height="20" src="https://ci3.googleusercontent.com/proxy/nbmGu89uxeNKRKpuWA59pYh1cjVbQst3JLQ81u59M_qCGxCQAn_LzVT2wGZY104aK4MyzM75Fg=s0-d-e1-ft#https://cdn.lu.ma/email/facebook.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        
      </tr>
    
                </tbody>
              </table>
            
              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                <tbody>
                  
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:middle">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
            <tbody>
              <tr>
                <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
                  <a href="https://lu.ma/social-share?m=join-event&amp;n=test&amp;pa=i5rpb4v4&amp;p=tw" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3Dtest%26pa%3Di5rpb4v4%26p%3Dtw&amp;source=gmail&amp;ust=1685110880823000&amp;usg=AOvVaw0gkFm8kS8BJKJkeby9wgPl">
                    <img height="20" src="https://ci6.googleusercontent.com/proxy/z3Za11B3DkUZmCoA4McmxJqwiotUj_6GEK5aVbUelVG5ohexlBIM8SORUkZYOh6mkl4-jvER=s0-d-e1-ft#https://cdn.lu.ma/email/twitter.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        
      </tr>
    
                </tbody>
              </table>
            
              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                <tbody>
                  
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:middle">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
            <tbody>
              <tr>
                <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
                  <a href="https://lu.ma/social-share?m=join-event&amp;n=test&amp;pa=i5rpb4v4&amp;p=li" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3Dtest%26pa%3Di5rpb4v4%26p%3Dli&amp;source=gmail&amp;ust=1685110880823000&amp;usg=AOvVaw0pCM-ivijNa4Me8H3v5cfq">
                    <img height="20" src="https://ci3.googleusercontent.com/proxy/W9yXHTpOfQjLAO4HctQdPxHEuOF_pYhT3TuEOx90vSmG2Ed5EWVKGjdrvx4BRidv9PLwYwl78A=s0-d-e1-ft#https://cdn.lu.ma/email/linkedin.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        
      </tr>
    
                </tbody>
              </table>
            
              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                <tbody>
                  
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:middle">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
            <tbody>
              <tr>
                <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
                  <a href="https://lu.ma/social-share?m=join-event&amp;n=test&amp;pa=i5rpb4v4&amp;p=wa" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3Dtest%26pa%3Di5rpb4v4%26p%3Dwa&amp;source=gmail&amp;ust=1685110880823000&amp;usg=AOvVaw04qptyowe_By-5kyqS0NCQ">
                    <img height="20" src="https://ci4.googleusercontent.com/proxy/Lvy3vOGJUrdUexVIzJ51dRlR5D6Nihb4_pT-TvJc1cLZ3xxyPAl6FjCNVpsL8zWfjizifIvnQQ=s0-d-e1-ft#https://cdn.lu.ma/email/whatsapp.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        
      </tr>
    
                </tbody>
              </table>
            
              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                <tbody>
                  
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:middle">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
            <tbody>
              <tr>
                <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
                  <a href="https://lu.ma/social-share?m=join-event&amp;n=test&amp;pa=i5rpb4v4&amp;p=me" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3Dtest%26pa%3Di5rpb4v4%26p%3Dme&amp;source=gmail&amp;ust=1685110880823000&amp;usg=AOvVaw0vA4AB2pIMaloAS9Avk4tb">
                    <img height="20" src="https://ci6.googleusercontent.com/proxy/UYmVFWSLQim1Fz472Ag4v7F8knO2ojcwuLdsacIVBx3DVl8XuxM6LofEfBPN_msrovpXxYhezpY=s0-d-e1-ft#https://cdn.lu.ma/email/messenger.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
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
                <td align="center" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word">
                  
      <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
      </p>
      
      
    
    
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
    
      
      
    
      
      <div style="margin:0px auto;max-width:600px">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
                
            
      <div class="m_-7274134027962948929mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td style="vertical-align:top;padding:0px">
              
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><div><div class="m_-7274134027962948929col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;padding-right:10px;word-break:break-word"><a href="https://lu.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1685110880823000&amp;usg=AOvVaw0u0DzxGQGONrsTdVjSdHfO"><img height="15" width="45" src="https://ci5.googleusercontent.com/proxy/OT4HHwv-eHH3muHLOZL1jaMJSWSCwertxQIAliVyOF0eHoNasdlkgJwJT64fVj7xTgZ3=s0-d-e1-ft#https://cdn.lu.ma/email/logo.png" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></div><div class="m_-7274134027962948929col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;word-break:break-word"><div style="font-size:12px;text-align:right;color:#b3b5b7"><a href="https://lu.ma/unsubscribe?host_api_id=usr-reAqh7vhaeFdI95&amp;pk=g-RCwCboXsIsBBRDX" style="color:#b3b5b7;text-decoration:none!important" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/unsubscribe?host_api_id%3Dusr-reAqh7vhaeFdI95%26pk%3Dg-RCwCboXsIsBBRDX&amp;source=gmail&amp;ust=1685110880823000&amp;usg=AOvVaw2tIUdzB6BCG2CCuXqm_xDh">Unsubscribe</a></div></td></tr></tbody></table></div></div></div>
    
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
    
  <img src="https://ci3.googleusercontent.com/proxy/bugeV9pqeT5ijHe9L-y0BvqAVWRUalA28jGd0iH41rIzRfZBoTwMt3UNof8iHI43cRQhhTiAKj5xUpRbDpUVMgg3M4qNQnih9AoUWyrz0ZpOJ67r6iCo-B1mqeUmyntgUccAOLTHBU6Pwto9NfKt7JnAQz6ddpKiSioQjjjlsUvtrdWt85m4Xq67ra4GxQoNYofr8VfB9JIkgtEFzN7CbICfzZY-Fyt9_HBvoWfiwuym5DDrCyoJnat2cnPM633orIF4juvGo9u1iLeNVrc2Tcul_ZK2oFlvIr4U60YEv1hyjASedWpPaRdnuErvvEsZCzhmRKECBM1ylrdRhjzNgseyN5d5RTnOFsPxnHzOrohj2MAGzSN-JxoBYLQSqbnGKvxB26ot1RDtFW9Yb4QkfIaiWlv7ZupRp6t4QfdjkZbnyMNJ5_SyhOPKl0OZvnle9vSIdgzVMazqNrKSVPXlcNkD-3WJzLkQqdbrH1utMeJ1pnPwTu_0WuPl7sMrxum1gCdeLXYeQ7MhTRR7TKszTSmv39Jbp1pb0oQV4yu4k8LV9CZeXSgY5O95phq9DnqYPomsWavtrX58RhMjeqOqtHiNUwaHYBXJk5pzND8KBnZ5_RcZKQgU5ly4DfBPL0a85wNtFY7dAOPoH8tIITVq1CbHMKGl_uvZVy7YqZCRvFw5bGzRit1pCv1kSrEOkZ-rJg2M8SC008kGLH8HIl8VzWl7gUzKrTFaxffhMB8zEfZnVs3PsNlc9nYBZumAJO9CkJfHcve1tSloClgg44qtUWcGIAt7gOE9xAWwy-WwqPi0-tF7F-807vpADq26X4j0d_Ydcxha7_DJFXqEkSNugK0BAUYwG23N7qLlcMS7kBi3mT2beWQAsYGnG9qZV_xtHefKmTFm6_AMTDDBj-_SZPTX2ZPyHu-rqLbffeZ6a1-_WilUJDVmqEkG3gg=s0-d-e1-ft#https://ea.pstmrk.it/open?m=v3_1.mZwQQbmiCYViKRlKSS_chQ.SMiYEWt7yG4giNuAVECQUDUTkh5D205ix4NOXrszQXT7oaamo3VsU6JRpCvC24pTZvUIxy8KXekGdr82gibd6Mw1TP4Ishpb8UvWLcdfMZUQ5ZJGtLFSH2E4m1SIUBauMH_YpyhKMIdYwTMz0TeqrHyXWkoVJ2WlSqcnX3mMiB39Epos272GSGz8eCw48WNRg2YmZEyIbTwKNyR7du7qTzgTG3F-SiPvtPD9piSB9faqCGJKsiRUNP9Ra-XK1ODtZdeOaOSiGI_2X1YWgAa_xfy5G9tfoChj9xm8FNaJdYMjaYOBOW5vaUflX5RZ5R6Td6DTaB5WBB5r8jnVQ_920QdYkoKPpR5Cci16lBLKyA4cmExF8a6axIMh5yuPQzz3EnImin2B9KlznoKA1zA2cw-HENUOS86oi8IMkALGYhrGOb68V-mVm2G-yksFDg8obGjbJDAaSv3Oevqe25tvDWJ8NkC6WA95WihfuSVcNZ5Sfh_W90F0sNqxRn5mrbMDW9tvS5wErmF7muavILE6tfmBnLdm0pojMDq_b3BnQpzGq-mk4eWuWR1WyxB0HWfdLAV35x33SgbPXwlXF8Nn79v9u6iQTYj7YL09r_tfWWCgEN0DlWd5qviGTeomSnZ7" width="1" height="1" border="0" alt="" class="CToWUd" data-bit="iit"></div>
`;
};

const htmlEmailConfirm = (data) => {
  return (
    `<div style="word-spacing:normal">
    
    
  <div>
    
  
  

  
  <div style="margin:0px auto;max-width:600px">
    
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
            
        
  <div class="m_-8762960883592302839mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
    
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      <tr>
        <td style="vertical-align:top;padding:0px">
          
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><table border="0" style="padding-bottom:4px;display:block" cellpadding="0" cellspacing="0" role="presentation" align="left"><tbody><tr><td style="vertical-align:middle"><a href="https://lu.ma/u/usr-Zaq8wOEk4swZGJX" style="display:flex;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/u/usr-Zaq8wOEk4swZGJX&amp;source=gmail&amp;ust=1685204817156000&amp;usg=AOvVaw04yI2q6y85Wi4EVUktlPiC"><img height="18" src=${
    data.data.hosts[0].avatar
  } style="width:18px;height:18px;border-radius:18px" class="CToWUd" data-bit="iit"></a></td><td style="vertical-align:middle;padding-left:8px"><a href="https://lu.ma/u/usr-Zaq8wOEk4swZGJX" style="color:#737577!important;font-size:16px!important;line-height:1.5!important;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/u/usr-Zaq8wOEk4swZGJX&amp;source=gmail&amp;ust=1685204817156000&amp;usg=AOvVaw04yI2q6y85Wi4EVUktlPiC">${
      data.data.hosts[0].name
    }</a></td></tr></tbody></table></div>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><h1 style="margin-top:0;margin-bottom:4px;font-size:24px;line-height:32px"><b>You have been approved to join</b><div style="font-weight:normal;color:#b3b5b7">${
    data.data.name
  }</div></h1></div>

            </td>
          </tr>
        
          <tr>
            <td align="center" style="font-size:0px;padding:0px;padding-top:16px;padding-bottom:16px;word-break:break-word">
              
  <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
  </p>
  
  


            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517">
  <table><tbody><tr><td style="padding-bottom:8px"><table border="0"><tbody><tr><td style="vertical-align:middle;width:40px;height:40px;padding:0"><table width="40" cellspacing="0" cellpadding="0" border="0" style="border-spacing:0;border-collapse:separate"><tbody><tr><td style="padding:0;margin:0;background-color:#eceded!important;border:1px solid #eceded;font-size:8px!important;line-height:2!important;border-top-right-radius:8px;border-top-left-radius:8px" valign="middle" align="center">
  <span style="color:#737577!important;font-size:8px!important;line-height:2!important;font-weight:500">${new Date(
    data.data.start_time
  ).toLocaleString("default", {
    month: "long",
  })}</span>
  </td></tr><tr><td style="padding:0;margin:0;background-color:#ffffff;border:1px solid #eceded;border-bottom-right-radius:8px;border-bottom-left-radius:8px;font-size:16!important;line-height:1.5!important" valign="top" align="center">
  <span style="font-size:16!important;line-height:1.5!important;font-weight:500;color:#737577">${new Date(
    data.data.start_time
  ).toLocaleString("default", {
    day: "numeric",
  })}</span>
  </td></tr></tbody></table></td><td style="vertical-align:middle;padding-left:12px"><div><div style="font-size:16px;color:#131517;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${new Date(
    data.data.start_time
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}</div><div style="font-size:14px;color:#737577;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"> ${
      data.data.start_time
    }</div></div></td></tr></tbody></table></td></tr>
  ` +
    // <tr><td><table border="0"><tbody><tr><td style="vertical-align:middle;width:40px;height:40px;padding:0"><table border="0" style="padding:0;border-collapse:separate;border-spacing:0"><tbody><tr><td style="border:1px solid #eceded;vertical-align:middle;width:40px;height:40px;border-radius:8px" align="center"><img style="display:block" src="https://ci3.googleusercontent.com/proxy/GYJcRDbnw3Y3_7dpkLzhYvO6W-RxJ2dYxxETi4RAenh8bt5_gLV4tDMW69FIwE958QSAeesorfTaDDOGk1Gmo8DKgbt2hUTIEUy11Eo4Y6sGbZ2jZ8Gil707JV5-1GLI2hXunPNdzVMWubVATJZzkab1znz6g0OQUY8VKTBo0QvabgkQUSeyotaVPXYU7t0fFD6t1krEs_aQzQ=s0-d-e1-ft#https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=85,width=40,height=40/misc/20/04a81bba-a20c-49c2-85bc-568cbcebe1a0" width="20" height="20" class="CToWUd" data-bit="iit"></td></tr></tbody></table></td><td style="vertical-align:middle;padding-left:12px"><div style="font-size:16px;color:#131517;font-weight:500">Zoom</div></td></tr></tbody></table></td></tr></tbody></table></div>
    `${
      data.data.type.event_type === "IN_PERSON"
        ? '<tr><td><table border="0"><tbody><tr><td style="vertical-align:middle;width:40px;height:40px;padding:0"><table border="0" style="padding:0;border-collapse:separate;border-spacing:0"><tbody><tr><td style="border:1px solid #eceded;vertical-align:middle;width:40px;height:40px;border-radius:8px" align="center"><img style="display:block" src="https://ci6.googleusercontent.com/proxy/n9tgTMYsugezBKsLlCsgZJ1aEFtZNQnfqhFcTHyWVunSlEY0PdYW3aWumVCZhP0MDzL--TJo8Wps1avY52kMXhK-0g3iA-Mmz5r5r3UwWUD0ZFo1-fyBJbh6Y23qA4Vm58oJrGK6YcxxUW1bGEACg9LCQoqPcaba9r0YFfV9jBnmEaTN45lFHwvSdrdnozmvGtURVh_nKWeobA=s0-d-e1-ft#https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=85,width=40,height=40/misc/3k/95610a7f-2391-4002-9779-a1e9bfb7216c" width="20" height="20" class="CToWUd" data-bit="iit"/></td></tr></tbody></table></td><td style="vertical-align:middle;padding-left:12px"><a href="https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(data.data.type.location) +
          '&query_place_id=EkoxMjgvMzJiIELDuWkgUXVhbmcgTMOgLCBQaMaw4budbmcgMTIsIEfDsiBW4bqlcCwgSG8gQ2hpIE1pbmggQ2l0eSwgVmlldG5hbSIxEi8KFAoSCfcHlY13KXUxEdi72jL3HpkEIABKhQKEgnF8icTeCl1MRFfHz3YZGC6Pw" style="display:block;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(data.data.type.location) +
          '&query_place_id=EkoxMjgvMzJiIELDuWkgUXVhbmcgTMOgLCBQaMaw4budbmcgMTIsIEfDsiBW4bqlcCwgSG8gQ2hpIE1pbmggQ2l0eSwgVmlldG5hbSIxEi8KFAoSCfcHlY13KXUxEdi72jL3HpkEIABKhQKEgnF8icTeCl1MRFfHz3YZGC6Pw"><div><div style="font-size:16px;color:#131517;font-weight:500">' +
          data.data.type.location +
          ' ↗</div><div style="font-size:14px;color:#737577;font-weight:400"> ----------- </div></div></a></td></tr></tbody></table></td></tr>'
        : '<td><table border="0"><tbody><tr><td style="vertical-align:middle;width:40px;height:40px;padding:0"><table border="0" style="padding:0;border-collapse:separate;border-spacing:0"><tbody><tr><td style="border:1px solid #eceded;vertical-align:middle;width:40px;height:40px;border-radius:8px" align="center"><img style="display:block" src="https://ci3.googleusercontent.com/proxy/GYJcRDbnw3Y3_7dpkLzhYvO6W-RxJ2dYxxETi4RAenh8bt5_gLV4tDMW69FIwE958QSAeesorfTaDDOGk1Gmo8DKgbt2hUTIEUy11Eo4Y6sGbZ2jZ8Gil707JV5-1GLI2hXunPNdzVMWubVATJZzkab1znz6g0OQUY8VKTBo0QvabgkQUSeyotaVPXYU7t0fFD6t1krEs_aQzQ=s0-d-e1-ft#https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=85,width=40,height=40/misc/20/04a81bba-a20c-49c2-85bc-568cbcebe1a0" width="20" height="20" class="CToWUd" data-bit="iit"/></td></tr></tbody></table></td><td style="vertical-align:middle;padding-left:12px"><div style="font-size:16px;color:#131517;font-weight:500">' +
          data.data.type.event_type +
          "</div></td></tr></tbody></table></td>"
    }  ` +
    `
            </td>
          </tr>
        
          <tr>
            <td align="center" style="font-size:0px;padding:0px;padding-top:16px;padding-bottom:16px;word-break:break-word">
              
  <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
  </p>
  
  


            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><div><div class="m_-8762960883592302839mirror-content"><p>​Congratulations! You can find more information on the event page.</p></div></div></div>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;padding-top:16px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top"><tbody><tr><td align="left"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%"><tbody><tr><td align="center" bgcolor="#de3163" role="presentation" style="border:none;border-radius:8px;background:#de3163;text-decoration:none" valign="middle"><a href="https://lu.ma/4ny78a2q?pk=g-Xa0QgjXNvFzfiv4" style="display:inline-block;background-color:#de3163;color:white;font-family:helvetica;font-size:16px;line-height:1;margin:0;text-decoration:none;text-transform:none;border-radius:8px;font-weight:700;padding:12px 24px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/4ny78a2q?pk%3Dg-Xa0QgjXNvFzfiv4&amp;source=gmail&amp;ust=1685204817156000&amp;usg=AOvVaw3XsjvLwbfhosqADb3h10Ev">Open Event Page</a></td></tr></tbody></table></td><td align="left" style="padding-left:10px"></td></tr></tbody></table></div>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;padding-top:24px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:14px;line-height:1.6;text-align:left;color:#737577">The host needs to approve your registration before you can join the event. We will email you when they do.</div>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;padding-top:24px;word-break:break-word">
              ${
                data.data.type.event_type === "ZOOM"
                  ? `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><table cellpadding="0" cellspacing="5" width="100%"><colgroup><col span="1" style="width:120px"></colgroup><tbody><tr><td valign="top" nowrap="">Click to Join</td><td><a class="m_-8762960883592302839cta-link" href="${data.data.type.zoom_url}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${data.data.type.zoom_url}&amp;source=gmail&amp;ust=1685204817156000&amp;usg=AOvVaw2ykAub3Ko9rBz0DW78qsnh">${data.data.type.zoom_url}</a></td></tr><tr><td valign="top" nowrap="" style="padding-top:8px">Zoom ID</td><td style="padding-top:8px"><b>${data.data.type.zoom_id}</b></td></tr><tr><td valign="top" nowrap="" style="padding-top:8px">Password</td><td style="padding-top:8px"><b>${data.data.type.zoom_password}</b></td></tr></tbody></table></div>`
                  : `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><table cellpadding="0" cellspacing="5" width="100%"><colgroup><col span="1" style="width:120px"></colgroup><tbody><tr><td valign="top" nowrap="">Click to Join</td><td><a class="m_-8762960883592302839cta-link"
               href=${
                 data.data.type.location
                   ? "https://www.google.com/maps/search/?api=1&query=" +
                     encodeURIComponent(data.data.type.location) +
                     "&query_place_id=EkoxMjgvMzJiIELDuWkgUXVhbmcgTMOgLCBQaMaw4budbmcgMTIsIEfDsiBW4bqlcCwgSG8gQ2hpIE1pbmggQ2l0eSwgVmlldG5hbSIxEi8KFAoSCfcHlY13KXUxEdi72jL3HpkEIABKhQKEgnF8icTeCl1MRFfHz3YZGC6Pw"
                   : data.data.type.event_url
               } 
               target="_blank" data-saferedirecturl=${
                 data.data.type.location
                   ? "https://www.google.com/maps/search/?api=1&query=" +
                     encodeURIComponent(data.data.type.location) +
                     "&query_place_id=EkoxMjgvMzJiIELDuWkgUXVhbmcgTMOgLCBQaMaw4budbmcgMTIsIEfDsiBW4bqlcCwgSG8gQ2hpIE1pbmggQ2l0eSwgVmlldG5hbSIxEi8KFAoSCfcHlY13KXUxEdi72jL3HpkEIABKhQKEgnF8icTeCl1MRFfHz3YZGC6Pw"
                   : data.data.type.event_url
               } >${
                      data.data.type.location
                        ? data.data.type.location
                        : data.data.type.event_url
                    }</a></td></tr></tr></tbody></table></div>`
              }
            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;padding-top:32px;padding-bottom:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:12px;font-weight:500;line-height:1.6;text-align:left;color:#b3b5b7">Share with friends</div>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;padding-bottom:8px;word-break:break-word">
              
  
 
          <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
            <tbody>
              
  <tr>
    <td style="padding:12px 16px 12px 0;vertical-align:middle">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
        <tbody>
          <tr>
            <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
              <a href="https://lu.ma/social-share?m=join-event&amp;n=Test%20n%C3%A8&amp;pa=4ny78a2q&amp;p=fb" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3DTest%2520n%25C3%25A8%26pa%3D4ny78a2q%26p%3Dfb&amp;source=gmail&amp;ust=1685204817156000&amp;usg=AOvVaw0rHOwU5VZd5S2uayzfNDvb">
                <img height="20" src="https://ci3.googleusercontent.com/proxy/nbmGu89uxeNKRKpuWA59pYh1cjVbQst3JLQ81u59M_qCGxCQAn_LzVT2wGZY104aK4MyzM75Fg=s0-d-e1-ft#https://cdn.lu.ma/email/facebook.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
    
  </tr>

            </tbody>
          </table>
        
          <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
            <tbody>
              
  <tr>
    <td style="padding:12px 16px 12px 0;vertical-align:middle">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
        <tbody>
          <tr>
            <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
              <a href="https://lu.ma/social-share?m=join-event&amp;n=Test%20n%C3%A8&amp;pa=4ny78a2q&amp;p=tw" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3DTest%2520n%25C3%25A8%26pa%3D4ny78a2q%26p%3Dtw&amp;source=gmail&amp;ust=1685204817157000&amp;usg=AOvVaw1Wilq4KSwiDR0YxnKZUY0E">
                <img height="20" src="https://ci6.googleusercontent.com/proxy/z3Za11B3DkUZmCoA4McmxJqwiotUj_6GEK5aVbUelVG5ohexlBIM8SORUkZYOh6mkl4-jvER=s0-d-e1-ft#https://cdn.lu.ma/email/twitter.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
    
  </tr>

            </tbody>
          </table>
        
          <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
            <tbody>
              
  <tr>
    <td style="padding:12px 16px 12px 0;vertical-align:middle">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
        <tbody>
          <tr>
            <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
              <a href="https://lu.ma/social-share?m=join-event&amp;n=Test%20n%C3%A8&amp;pa=4ny78a2q&amp;p=li" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3DTest%2520n%25C3%25A8%26pa%3D4ny78a2q%26p%3Dli&amp;source=gmail&amp;ust=1685204817157000&amp;usg=AOvVaw0NQREkxBrIm8zvhoMocT7C">
                <img height="20" src="https://ci3.googleusercontent.com/proxy/W9yXHTpOfQjLAO4HctQdPxHEuOF_pYhT3TuEOx90vSmG2Ed5EWVKGjdrvx4BRidv9PLwYwl78A=s0-d-e1-ft#https://cdn.lu.ma/email/linkedin.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
    
  </tr>

            </tbody>
          </table>
        
          <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
            <tbody>
              
  <tr>
    <td style="padding:12px 16px 12px 0;vertical-align:middle">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
        <tbody>
          <tr>
            <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
              <a href="https://lu.ma/social-share?m=join-event&amp;n=Test%20n%C3%A8&amp;pa=4ny78a2q&amp;p=wa" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3DTest%2520n%25C3%25A8%26pa%3D4ny78a2q%26p%3Dwa&amp;source=gmail&amp;ust=1685204817157000&amp;usg=AOvVaw0JAMzDX346bcclysyHnSVK">
                <img height="20" src="https://ci4.googleusercontent.com/proxy/Lvy3vOGJUrdUexVIzJ51dRlR5D6Nihb4_pT-TvJc1cLZ3xxyPAl6FjCNVpsL8zWfjizifIvnQQ=s0-d-e1-ft#https://cdn.lu.ma/email/whatsapp.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
    
  </tr>

            </tbody>
          </table>
        
          <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
            <tbody>
              
  <tr>
    <td style="padding:12px 16px 12px 0;vertical-align:middle">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px">
        <tbody>
          <tr>
            <td style="font-size:0;height:20px;vertical-align:middle;width:20px">
              <a href="https://lu.ma/social-share?m=join-event&amp;n=Test%20n%C3%A8&amp;pa=4ny78a2q&amp;p=me" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/social-share?m%3Djoin-event%26n%3DTest%2520n%25C3%25A8%26pa%3D4ny78a2q%26p%3Dme&amp;source=gmail&amp;ust=1685204817157000&amp;usg=AOvVaw26MTA9MQKkuNBKM4ZVnMIK">
                <img height="20" src="https://ci6.googleusercontent.com/proxy/UYmVFWSLQim1Fz472Ag4v7F8knO2ojcwuLdsacIVBx3DVl8XuxM6LofEfBPN_msrovpXxYhezpY=s0-d-e1-ft#https://cdn.lu.ma/email/messenger.png" style="border-radius:3px;display:block" width="20" class="CToWUd" data-bit="iit">
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
            <td align="center" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word">
              
  <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
  </p>
  
  


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

  
  

  
  <div style="margin:0px auto;max-width:600px">
    
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
            
        
  <div class="m_-8762960883592302839mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
    
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      <tr>
        <td style="vertical-align:top;padding:0px">
          
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><div><div class="m_-8762960883592302839col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;padding-right:10px;word-break:break-word"><a href="https://lu.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1685204817157000&amp;usg=AOvVaw1hLD7w2GgE3CFYUYXnGGvV"><img height="15" width="45" src="https://ci5.googleusercontent.com/proxy/OT4HHwv-eHH3muHLOZL1jaMJSWSCwertxQIAliVyOF0eHoNasdlkgJwJT64fVj7xTgZ3=s0-d-e1-ft#https://cdn.lu.ma/email/logo.png" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></div><div class="m_-8762960883592302839col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;word-break:break-word"><div style="text-align:right"><a href="https://lu.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1685204817157000&amp;usg=AOvVaw1hLD7w2GgE3CFYUYXnGGvV"><img width="16" height="16" src="https://ci4.googleusercontent.com/proxy/fleVNv-FYPeYkx-4zhnEdfCL4hzN4_kqRqAnLHnEid6caAtqXiFMDdGgc7kwbE6c2BIVEid0lI8=s0-d-e1-ft#https://cdn.lu.ma/email/luma-star.png" class="CToWUd" data-bit="iit"></a></div></td></tr></tbody></table></div></div></div>

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

<img alt="" src="https://ci3.googleusercontent.com/proxy/mk02wjaBjZhlmhmPLhtYkH6Ff-84aZke0ffO5ie2AbSo5-cAGmcqJO3aO_CCUY8dBm3DyzRHAU65IKsARkDn4Jc3JkGjQVQO3PRhdqPf0wPtH7CQ3jX7kxjlaFm3GjVuUO4267DrbXp_kLM24MN1j0LM74yYMwZ7_ApEmGbAdvv3cDluTFQ8pLT9GANL1awrDal08nsaBIAPlEEW=s0-d-e1-ft#https://jpdm6py0.r.us-west-2.awstrack.me/I0/0101018848b29226-3f0696b5-2994-4e18-8635-41cf585c79d8-000000/dh-auu87JnUsnkuBTT8yr-2nby0=323" style="display:none;width:1px;height:1px" class="CToWUd" data-bit="iit"><div class="yj6qo"></div><div class="adL">
</div></div>
`
  );
};

const htmlEmailNotification = (data) => {
  return `
  <div style="word-spacing:normal">
    
    
      <div>
        
      
      
    
      
      <div style="margin:0px auto;max-width:600px">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
                
            
      <div class="m_5831283243267933550mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td style="vertical-align:top;padding:0px">
              
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-bottom:32px;word-break:break-word">
                  
      
     
              <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table">
                <tbody>
                  
      <tr>
        <td style="padding:0px;vertical-align:middle">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:24px">
            <tbody>
              <tr>
                <td style="font-size:0;height:24px;vertical-align:middle;width:24px">
                  <a href="https://lu.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1685458297936000&amp;usg=AOvVaw2GUykJ4LI62IVSFsX6xSLD">
                    <img height="24" src="https://ci4.googleusercontent.com/proxy/fleVNv-FYPeYkx-4zhnEdfCL4hzN4_kqRqAnLHnEid6caAtqXiFMDdGgc7kwbE6c2BIVEid0lI8=s0-d-e1-ft#https://cdn.lu.ma/email/luma-star.png" style="border-radius:3px;display:block" width="24" class="CToWUd" data-bit="iit">
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
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><h1 style="margin-top:0;margin-bottom:0;font-size:24px;line-height:1.25"><div><b>${
        data.user.name
      } (<a href="mailto:${data.user.email}" target="_blank">${
    data.user.email
  }</a>)</b></div><div style="font-weight:normal;color:#b3b5b7;margin-top:4px">${
    data.status === "accepted"
      ? "accepted your invite"
      : "registered for your event"
  }</div></h1></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:0px;padding-top:20px;padding-bottom:20px;word-break:break-word">
                  
      <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
      </p>
      
      
    
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><p style="margin-top:0">trung (<a href="mailto:${
        data.user.email
      }" target="_blank">${data.user.email}</a>) has registered for <b>${
    data.data.name
  }</b>.</p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;padding-top:16px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><div>Here's your registration count so far:</div><ul>${
        data.approved > 0 ? `<li><b>${data.approved}</b> approved</li>` : ``
      }${
    data.pending > 0 ? `<li><b>${data.pending}</b> pending approval</li>` : ``
  }</ul></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><p>Head over to the <a href="https://lu.ma/event/manage/evt-fZ6iDctVGxRe4jU/guests" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/event/manage/evt-fZ6iDctVGxRe4jU/guests&amp;source=gmail&amp;ust=1685458297937000&amp;usg=AOvVaw1GIm99aZcDwGa-6sUQqAII">manage event page</a> to approve or reject the registration. Guests won't have access to the meeting details until you approve them.</p></div>
    
                </td>
              </tr>
            
              <tr>
                <td align="center" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word">
                  
      <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
      </p>
      
      
    
    
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
    
      
      
    
      
      <div style="margin:0px auto;max-width:600px">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
                
            
      <div class="m_5831283243267933550mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          <tr>
            <td style="vertical-align:top;padding:0px">
              
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
                  
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><div><div class="m_5831283243267933550col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;padding-right:10px;word-break:break-word"><a href="https://lu.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1685458297937000&amp;usg=AOvVaw1FzONlooWbnkT1SChjiPqC"><img height="15" width="45" src="https://ci5.googleusercontent.com/proxy/OT4HHwv-eHH3muHLOZL1jaMJSWSCwertxQIAliVyOF0eHoNasdlkgJwJT64fVj7xTgZ3=s0-d-e1-ft#https://cdn.lu.ma/email/logo.png" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></div><div class="m_5831283243267933550col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;word-break:break-word"><div style="font-size:12px;text-align:right;color:#b3b5b7"><a href="https://lu.ma/unsubscribe?ehsk=eh-SpZDXE1ITThDQUF" style="color:#b3b5b7;text-decoration:none!important" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/unsubscribe?ehsk%3Deh-SpZDXE1ITThDQUF&amp;source=gmail&amp;ust=1685458297937000&amp;usg=AOvVaw3DjPmyIwDYGGUbrCs3_TML">Unsubscribe</a></div></td></tr></tbody></table></div></div></div>
    
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
    
  <img alt="" src="https://ci3.googleusercontent.com/proxy/Qps0iZsBJO4B8LX9jDSNnbP2IWHd4jtQlYSvBTgCsshSgYkSLiqDZhK0wEZKn8CAKWnCLSt3iCH8_qMXTFLLC8jPZtv7bOOho7JNXhifXalr7cYVzExGeFaJIR-NkVZAlXFAtr7xMn6rm6V6ecNUQ5IHs0T1Ljn0GZcIKYoFwtO8QzXtjEYlmgn7MM2BVSf2FYo58AHkOOyffZ4l=s0-d-e1-ft#https://jm54dyh1.r.us-west-2.awstrack.me/I0/01010188535b707f-e2d65e80-fa3e-4c73-8a61-b92bb650abaf-000000/uXbtA176jT8Lk1rnxo7O_CCwmV8=324" style="display:none;width:1px;height:1px" class="CToWUd" data-bit="iit"><div class="yj6qo"></div><div class="adL">
</div></div>
  `;
};

const htmlThank = (data) => {
  return (
    `<div style="word-spacing:normal">
  <div>
  
  <div style="margin:0px auto;max-width:600px">
    
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
            
        
  <div class="m_3047133006127817545mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
    
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      <tr>
        <td style="vertical-align:top;padding:0px">
          
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      
          <tr>
            <td align="left" style="font-size:0px;padding:0px;padding-top:32px;padding-bottom:32px;word-break:break-word">
              
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
    <tbody>
      <tr>
        <td style="width:50px">
          
  <img src="https://ci3.googleusercontent.com/proxy/EhoIcGgFr4aPQXRJ2ONl4NTXLXLT84ZiMnIo2cqDbRdSbel7443PVXYDKwJqBPZGKzGSGS8xV1WU0FEx054=s0-d-e1-ft#https://files.zmurl.com/email/star-icon.png" style="border:0;display:block;outline:none;text-decoration:none;height:50px;width:100%;font-size:16px" width="50" height="50" class="CToWUd" data-bit="iit">

        </td>
      </tr>
    </tbody>
  </table>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><h1 style="margin-top:0;margin-bottom:4px;font-size:24px;line-height:32px"><b>Thank you for joining</b><div style="font-weight:normal;color:#b3b5b7">` +
    data.data.name +
    `</div></h1></div>

            </td>
          </tr>
        
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><p>How did you like <b>${data.data.name}</b>?</p></div>

            </td>
          </tr>
        <tr><td><table><tbody><tr><td><table class="m_3047133006127817545survey-pill"><tbody><tr><td class="m_3047133006127817545survey-pill-content m_3047133006127817545emoji"><a href="https://lu.ma/survey-response?pk=g-RCwCboXsIsBBRDX&amp;rt=1" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/survey-response?pk%3Dg-RCwCboXsIsBBRDX%26rt%3D1&amp;source=gmail&amp;ust=1686140072021000&amp;usg=AOvVaw17BkOHmdCKjK-jLTmtkB84"><img src="https://ci5.googleusercontent.com/proxy/kjdH3k3X2Ij3foSmwEVcCzKMS5qYtS9YqpjRMPsAPskth59Vfpncyrq6Dw-_q0nbAIaWlrKpOgBGviU=s0-d-e1-ft#https://files.zmurl.com/email/star-1.png" alt="Terrible" width="28" height="28" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></td><td><table class="m_3047133006127817545survey-pill"><tbody><tr><td class="m_3047133006127817545survey-pill-content m_3047133006127817545emoji"><a href="https://lu.ma/survey-response?pk=g-RCwCboXsIsBBRDX&amp;rt=2" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/survey-response?pk%3Dg-RCwCboXsIsBBRDX%26rt%3D2&amp;source=gmail&amp;ust=1686140072022000&amp;usg=AOvVaw2RC5zRv1cBCMUY4ssLXNmF"><img src="https://ci6.googleusercontent.com/proxy/Z-a1PPssOBI4pR3AmA5aj91suIuVAZJCZwWZbowy0L3NJZAcmXJqT1KVOvPxUyPwLVPv5KI2JIema4o=s0-d-e1-ft#https://files.zmurl.com/email/star-2.png" alt="Bad" width="28" height="28" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></td><td><table class="m_3047133006127817545survey-pill"><tbody><tr><td class="m_3047133006127817545survey-pill-content m_3047133006127817545emoji"><a href="https://lu.ma/survey-response?pk=g-RCwCboXsIsBBRDX&amp;rt=3" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/survey-response?pk%3Dg-RCwCboXsIsBBRDX%26rt%3D3&amp;source=gmail&amp;ust=1686140072022000&amp;usg=AOvVaw0PtKM1N-uoAYEaK5o2q5DV"><img src="https://ci5.googleusercontent.com/proxy/qFqTmj1jghrhZhZDiQMv6sUE5JlxUnBdWSrS4bzfKdJii59KoAGNsXCxFpqPRLNgz9rEDymaWkBfQfk=s0-d-e1-ft#https://files.zmurl.com/email/star-3.png" alt="Meh" width="28" height="28" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></td><td><table class="m_3047133006127817545survey-pill"><tbody><tr><td class="m_3047133006127817545survey-pill-content m_3047133006127817545emoji"><a href="https://lu.ma/survey-response?pk=g-RCwCboXsIsBBRDX&amp;rt=4" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/survey-response?pk%3Dg-RCwCboXsIsBBRDX%26rt%3D4&amp;source=gmail&amp;ust=1686140072022000&amp;usg=AOvVaw3XhIwmqZGO8n8J3cCs9PcX"><img src="https://ci6.googleusercontent.com/proxy/9AZp0U8sOsVqwMTs1ViblAK46SrD3_gfc5RiItpZNl9ahUWyNKMKoFfKEDmHhQIlL8r5oHF_bjuPbr4=s0-d-e1-ft#https://files.zmurl.com/email/star-4.png" alt="Good" width="28" height="28" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></td><td><table class="m_3047133006127817545survey-pill"><tbody><tr><td class="m_3047133006127817545survey-pill-content m_3047133006127817545emoji"><a href="https://lu.ma/survey-response?pk=g-RCwCboXsIsBBRDX&amp;rt=5" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/survey-response?pk%3Dg-RCwCboXsIsBBRDX%26rt%3D5&amp;source=gmail&amp;ust=1686140072022000&amp;usg=AOvVaw1vw0GH-CwpgCBuA8-XrMW8"><img src="https://ci5.googleusercontent.com/proxy/RxhBcpcI_mFRjv-BJHi2QKwlCwqHIMisaYbOeESHD4tUd40TG771B9AECUJjH4BOBl-Tz7a0l2M_AkM=s0-d-e1-ft#https://files.zmurl.com/email/star-5.png" alt="Great" width="28" height="28" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></td></tr></tbody></table>
          </td></tr><tr>
            <td align="center" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word">
              
  <p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
  </p>
  
  


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

  
  

  
  <div style="margin:0px auto;max-width:600px">
    
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0px;padding:16px;text-align:center">
            
        
  <div class="m_3047133006127817545mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
    
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      <tr>
        <td style="vertical-align:top;padding:0px">
          
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
    <tbody>
      
          <tr>
            <td align="left" style="font-size:0px;padding:0px;word-break:break-word">
              
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517"><div><div class="m_3047133006127817545col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;padding-right:10px;word-break:break-word"><a href="https://lu.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma&amp;source=gmail&amp;ust=1686140072022000&amp;usg=AOvVaw1Giaclyebjgrc6uMR7dRsl"><img height="15" width="45" src="https://ci5.googleusercontent.com/proxy/OT4HHwv-eHH3muHLOZL1jaMJSWSCwertxQIAliVyOF0eHoNasdlkgJwJT64fVj7xTgZ3=s0-d-e1-ft#https://cdn.lu.ma/email/logo.png" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></div><div class="m_3047133006127817545col-50" style="font-size:0;text-align:left;display:inline-block;vertical-align:top;width:100%;margin-bottom:8px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%"><tbody><tr><td align="left" style="font-size:0;word-break:break-word"><div style="font-size:12px;text-align:right;color:#b3b5b7"><a href="https://lu.ma/unsubscribe?host_api_id=usr-reAqh7vhaeFdI95&amp;pk=g-RCwCboXsIsBBRDX" style="color:#b3b5b7;text-decoration:none!important" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/unsubscribe?host_api_id%3Dusr-reAqh7vhaeFdI95%26pk%3Dg-RCwCboXsIsBBRDX&amp;source=gmail&amp;ust=1686140072022000&amp;usg=AOvVaw2qfqkh82POxjNF5gfJIwEe">Unsubscribe</a></div></td></tr></tbody></table></div></div></div>

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

<img src="https://ci4.googleusercontent.com/proxy/lA9KUDhYG-sB-p7CUrWrvuG2ahpz1GhQJ1Hpp5dOMNR4ButW8CCNsyO1jNKH3p03memfWTDvGSRTtv7O3Nd_4oHMqQ-BjRHCZfzh-Rg42UDSCuE6iztK9---qXN45egwgi__FJeSdf7mxq2kdm5YAHKPq_rtnECXX9mLTPAnRsm1IZErIFGmWCKatciWnBZb8rKwAJc5gLOj0C0xSrNC8hiy6D-gS-JxyP97dAibvPwrn0ahAVNimOkbRHCW6dR5mlQXlUeJRxzAiSzoP4BeGYiPsJ4uY05GTLQCi1En1uS27Pkd0KMmyRZLAzkdYEGd2hPk1VW_FJfAb_UX40rxRqdlLmcR5kF8SBjmvYU5DOAf_H-h4oiPzqgkmojOxVfFCPtuOO-NGUVONFHJTQVAC76PM5LJN27-FBC-3n_Ls_DPvX79ojUf9vHj92xv2a0dmwJJ6BeFxLeAASFlT00_4J1t9be1Uo9rLLlwP1162fwcuW6UCv_1CDKoWr1sJDmgoA9hZvUTPCOQTsYPkjPu_2yND_q7PEa4l3sQAUsygaXzgOjcoL-Iq7GDapf54m-uLWMi7V4wZ_MDLjcnNC5oIpdjIDArXN40P0knyVEM7uwmiCfNc7iZhZTJYHiJqzokk6NMRiG0fj8CND8_JZZ91QtYlLumN-OlaMpbK5iX_elaDpreB1pIrT-hk9xm7qvS5fjafPB_CBr6buAPj4Fw-mkBJG410ULTrqQhZyvXcnHt48AOo5nYD_pX_v5sYm2zfocnnrMuVEIaYlMXlWLCHgqxJAWRC1ld1G5Y-XP9uYbya83Rbx2cXoFHQTCtWWDhwEPk9KqfYLMhyQkx0C00iQhmA6asxURU8jUuOEELz074D-XR8EF3EjFhYEkeMbe7AcXrctqX9sj2F0W9cV-_AAQGxR4VKCCkC2zrmHL9KuvuEkAjs30Z4SRne3Q=s0-d-e1-ft#https://ea.pstmrk.it/open?m=v3_1.I2V2q92ECMrfX__h2DlFYg.dLqvf8EmR6_-rw6Q93EiOeN7JGgRDLjLjMx0A2l9iSo8cnSSJ31f85JGFl1po92zQwN5A788w_o5ahg7duCgyxw_ve9rIOdaJemlYvscCsUH030QLWNIQXsC1Sr_Jxpk3OKDVNmmuLvjoTFS0zNq0tWtNv07-jFO0CnE5gZJOJzdD2iW9rKfVrKBITbRJh7OZv7f7zilt4NCvfWOr8fbG2T373IJqHDzyd0nF5w_P-lQPwBRNO1gPnjn-SbSI1weRh8GAMeUirjpwDMaCZ-YRAoNPIbR-m0emIctwGH7qeMl8kpJqaNQqseM9SZKivw1ko8NV60qHVfUkPgVj7fEyLC3Ujs9CIL8ogpXCQQcG_mTADP4BHwwvTbAXTyqL4zrVQ5OZ3Vduyg8pRsTMB-hhZScJ4ABgo9Mrk1GMEh5SQ8w-_Gx7R4rSEthENpH5NNG__lFUDmlCIWWC1Zurov7XowW5wxpJ3hPqlDwDkWxVB03aBE0xKNrbYIDQnIyVfa5cLoDGCjPlUpVYXm6uiu86OQx-ukfwAeOzJ5TU0WYw-HiDPzj_B2OyFF4bZicokxP-IYV1sZ1ZZugVe1k4AnM5cYzis3X7o8wYv6RIU-afLz_Ne4QTNAypJl4S2KuyteK" width="1" height="1" border="0" alt="" class="CToWUd" data-bit="iit"></div>`
  );
};
