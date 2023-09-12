import {utilService} from "../services/util.service"

export function EmailPreview({ email }) {

    const SEC_IN_DAY = 60 * 60 * 24;
    const SEC_IN_YEAR = 365 * SEC_IN_DAY;
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const timeDiff = Date.now() - email.sentAt;

    let calcTime;
    if (timeDiff < 0)
        calcTime = "N/A";
    else {
        const emDate = new Date(email.sentAt);
        const emDateMinutes = utilService.padTwo(emDate.getMinutes());
        const emDateHours = utilService.padTwo(emDate.getHours());
        const emDateDay = utilService.padTwo(emDate.getDay());
        const emDateMonth = utilService.padTwo(emDate.getMonth());
        const emDateYear = emDate.getYear();

        if (timeDiff < SEC_IN_DAY) {
            calcTime = `${emDateHours}:${emDateMinutes}`;
        } else if (timeDiff < SEC_IN_YEAR) {
            calcTime = `${emDateDay} ${MONTH_NAMES[emDate.getMonth()]}`;
        } else {
            calcTime = `${emDateDay}/${emDateMonth}/${emDateYear}`;;
        }
    }


    return (
        <section className="email-preview">
            <span className="preview-from">{email.from}</span>
            <span className="preview-subject-n-body">
                <span className="preview-subject">{email.subject}</span>
                <span className="preview-body">{email.body}</span>
            </span>
            <time className="preview-time">{calcTime}</time>
        </section>
    )
}

