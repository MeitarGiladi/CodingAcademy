import { useState, useEffect } from 'react';

import { EmailPreview } from "./EmailPreview"

export function EmailList({ emails, CbUpdateEmail }) {
    // const [hoveredElement, setHoveredElement] = useState(null);

    // function hoveredEmailPreview(emailId) {
    //     setHoveredElement(emailId);
    // }

    return (
        <section className="email-list">

            {emails.map((em, idx) => <EmailPreview key={idx + em.id} {...em} cbUpdateEmail={CbUpdateEmail} />)}

        </section>
    )
}
