import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  return (
    <div>
      <Header defaultHeader={true} />
      <div className="container terms-of-use">
        <div className="row">
          <h1>TERMS OF USE</h1>
          <h3>Last Updated: September 25th, 2015</h3>
          <p>
            This Terms of Use Agreement (“Terms of Use”) is a legal agreement
            between you and Wistberry (“Wistberry”, “we”, “us”, or “our”)
            providing, among other things, the terms and conditions for your
            access to and use of our web site <Link to="/">wistberry.com</Link>{' '}
            (the “Site” or “website”). Please read these Terms of Use carefully
            and print a copy for your records.
            <br />
            <br />
            We may from time to time modify these Terms of Use and will post a
            copy of the amended Terms of Use at{' '}
            <Link to="/terms-of-use">wistberry.com/terms-of-use/</Link>. If you
            do not agree to, or cannot comply with, the Terms of Use as amended,
            you should not use this Site. You will be deemed to have accepted
            these Terms of Use as amended if you continue to use this Site after
            any amendments are posted on this Site.
          </p>
        </div>
        <div className="row">
          <h1>DISCLAIMER</h1>
          <h3>The types of information we may collect include:</h3>
          <p>
            The content of this website is general and is provided for
            information purposes only. The material on this website is not and
            should not be regarded as advice, including legal or medical advice.
            To the fullest extent permitted by law, Wistberry does not give any
            express or implied warranties or conditions and makes no
            representations in relation to this website. In particular, while
            reasonable care is taken in its preparation, Wistberry does not
            guarantee or warrant the accuracy, reliability, completeness or
            currency of the information on this website or its usefulness in
            achieving any purpose. Information on this website should not be
            used without validating that information from appropriate sources
            and obtaining professional advice where it is prudent to do so. You
            should make and rely upon your own assessments and enquires to
            verify the accuracy of the information provided.
            <br />
            <br />
            In addition, to the fullest extent permitted by law, Wistberry does
            not warrant that the website itself is free from any computer
            viruses or other defects or that your access to the website will be
            continuous or uninterrupted. Wistberry accepts no liability arising
            from your access to this website.
            <br />
            <br />
            THIS WEBSITE AND ALL INFORMATION PROVIDED THROUGH THIS WEBSITE ARE
            PROVIDED “AS IS” WITHOUT ANY WARRANTY OR CONDITION OF ANY KIND,
            WHETHER EXPRESS OR IMPLIED, ARISING FROM STATUTE, COURSE OF DEALING,
            USAGE OF TRADE OR OTHERWISE. THE FOREGOING DISCLAIMER SHALL APPLY TO
            THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAWS.
          </p>
        </div>
        <div className="row">
          <h1>LIMITATION OF LIABILITY</h1>
          <p>
            Subject to the provisions of consumer protection legislation that
            cannot be excluded, Wistberry accepts no liability arising from the
            information on this website, or on websites linked from this
            website, being incorrect, incomplete or misleading. To the fullest
            extent permitted by law, Wistberry will not be liable for any loss,
            damage, cost or expense incurred in or arising by reason of any
            person relying on the information on this website. Where conditions
            and warranties implied by law cannot be excluded, Wistberry limits
            its liability, where it is entitled to do so, to the resupply of the
            relevant service and goods, or paying you the cost of that resupply.
          </p>
        </div>
        <div className="row">
          <h1>INTELLECTUAL PROPERTY</h1>
          <h3>COPYRIGHT AND OTHER INTELLECTUAL PROPERTY</h3>
          <p>
            All content on this website, including text, graphics, logos,
            photographs, audio and video clips and data compilations is the
            property of Wistberry or its content suppliers and protected by
            national and international copyright laws and laws applicable to
            other intellectual property. The compilation of all content on this
            Site is the exclusive property of Wistberry and protected by
            national and international copyright laws.
          </p>
          <h3>TRADEMARKS</h3>
          <p>
            Wistberry and all related logos, and product and service names are
            trade-marks (both registered and unregistered) of Wistberry or its
            affiliates in Canada and other countries. These trade-marks, logos
            and other proprietary graphics may not be used in connection with
            any other product or service without Wistberry’s express prior
            written consent.
          </p>
        </div>
        <div className="row">
          <h1>LICENSE AND SITE ACCESS</h1>
          <p>
            Wistberry grants you a limited license to access and make personal
            use of this Site and not to download (other than page caching or to
            access wholesale inquiry forms designed for downloading) or modify
            it, or any portion of it, except with Wistberry’s express prior
            written consent. This license does not include any resale or
            commercial use of this Site or its contents; any collection and use
            of any product listings, descriptions or prices; any derivative use
            of this Site or its contents; any downloading or copying of account
            information for the benefit of another merchant; or any use of data
            mining, robots, or similar data gathering and extraction tools. This
            Site or any portion of this Site may not be reproduced, duplicated,
            copied, sold, resold, visited, or otherwise exploited for any
            commercial purpose without express prior written consent of
            Wistberry. You may not use any metatags or any other hidden text
            using Wistberry’s name or trademarks without Wistberry’s express
            prior written consent. Any unauthorized use will automatically
            terminate the license granted above.
            <br />
            <br />
            You are granted a limited, revocable, and non-exclusive right to
            create a hyperlink to <Link to="/">wistberry.com</Link> so long as
            the link does not portray Wistberry, its affiliates, or their
            products or services in a false, misleading, derogatory or otherwise
            offensive manner. If requested by Wistberry, you must remove any
            hyperlink to this website contained on your website or any other
            digital content. You may not use any Wistberry logo or other
            proprietary graphic or trade mark as part of the link without
            Wistberry’s express prior written consent.
          </p>
        </div>
        <div className="row">
          <h1>THIRD PARTY WEBSITES</h1>
          <p>
            Wistberry may include links on this website to websites owned by
            other parties. Wistberry is not in any way responsible for the
            material contained on these sites, nor is Wistberry responsible for
            the availability of these sites. Wistberry does not endorse and is
            not responsible or liable for any content, including advertising or
            products offered on these sites, nor is Wistberry responsible for
            any damage, offence or loss caused as the result of visiting these
            websites.
            <br />
            <br />
            Wistberry recommends that before you visit any website you check
            that your computer is running up-to- date virus checking software.
          </p>
        </div>
        <div className="row">
          <h1>PRIVACY</h1>
          <p>
            Personal information provided to Wistberry via this website will be
            handled in accordance with Wistberry’s Privacy Policy, which can be
            found at{' '}
            <Link to="/privacy-policy">wistberry.com/privacy-policy/</Link>.
          </p>
        </div>
        <div className="row">
          <h1>SECURITY</h1>
          <p>
            Wistberry’s credit card transactions are fulfilled by a banking
            institution authorized under the laws applicable to this website.
            When collecting credit card information for online purchases,
            Wistberry offers secured server transactions that encrypt your
            information in transit to help prevent others from accessing it. All
            information is stored on a server that is protected using
            appropriate safeguards. Your credit card details are encrypted and
            then removed from our system once your order has been dispatched.
            <br />
            <br />
            Although Wistberry engages all reasonable efforts to safeguard the
            security of your information, transmissions made on or through the
            Internet cannot be guaranteed to be entirely secure. Please contact
            your financial institution immediately if you become aware of
            unauthorized use of your account.
            <br />
            <br />
            You will need to register to use certain parts of this website. When
            registering, you will be required to nominate a username and
            password. You must keep this username and password safe and must not
            disclose this information to any third party. If you become aware of
            unauthorized use of your account, please notify us immediately.
          </p>
        </div>
        <div className="row">
          <h1>COOKIES</h1>
          <p>
            If your web browser is set up to accept cookies, a cookie will be
            stored on your hard drive when you visit Wistberry’s website.
            Cookies allow Wistberry to collect information about your computer,
            which may include your IP address (a number assigned to your
            computer when you register with an Internet Service Provider), type
            of browser, operating system, domain name, and the details of any
            website which has referred you to this website. Wistberry uses
            cookies to track and collect information about which parts of
            Wistberry’s Site and newsletter (including links to other websites)
            are being visited by you.
            <br />
            <br />
            Cookies also allow Wistberry to recognize your computer while you
            are on Wistberry’s site, and to send you to the country of origin
            and language you selected on your first visit to Wistberry’s site.
            This information is used to maintain the quality of our service and
            to provide tracking and statistics regarding the use of our website.
            <br />
            <br />
            If you would rather not have this information stored on your
            computer, you can configure your browser so it does not accept
            cookies. However, if you disable cookies you may not be able to
            access all parts of this website, including the purchase section.
          </p>
        </div>
        <div className="row">
          <h1>GENERAL</h1>
          <p>
            Wistberry may vary these Terms of Use at any time by publishing a
            revised version of the terms and conditions on this website.
            <br />
            <br />
            To the extent permissible by applicable law, the law applicable to
            this website is the law of the province of British Columbia and the
            laws of Canada applicable therein unless the applicable laws of your
            province of residence requires that the laws of such province to
            govern, in which case, the laws of such province are to govern.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
