import { utilService } from "../services/util.service"

export function EmailPreviewEndTime({ sentAt }) {

    const SEC_IN_DAY = 60 * 60 * 24;
    const SEC_IN_YEAR = 365 * SEC_IN_DAY;
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const timeDiff = Date.now() - sentAt;

    let calcTime;
    if (timeDiff < 0)
        calcTime = "N/A";
    else {
        const emDate = new Date(sentAt);
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
        <span className="email-preview-end-time">
            <time className="preview-time">{calcTime}</time>
        </span>
    )
}

