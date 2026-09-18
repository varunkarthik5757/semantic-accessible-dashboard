const reportDialog = document.getElementById("report-dialog");
const openReportButton = document.getElementById("open-report");

if (reportDialog && openReportButton) {

    openReportButton.addEventListener("click", () => {
        reportDialog.showModal();
    });

    reportDialog.addEventListener("close", () => {
        openReportButton.focus();
    });
}