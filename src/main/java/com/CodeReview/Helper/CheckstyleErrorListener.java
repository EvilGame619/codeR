package com.CodeReview.Helper;
import com.puppycrawl.tools.checkstyle.api.*;

public class CheckstyleErrorListener implements AuditListener{
    @Override
    public void auditStarted(AuditEvent event) {
        // You can handle when the audit starts
        System.out.println("Audit Started");
    }

    @Override
    public void auditFinished(AuditEvent event) {
        // You can handle when the audit finishes
        System.out.println("Audit Finished");
    }

    @Override
    public void fileStarted(AuditEvent event) {
        // You can handle when a file starts being checked
        System.out.println("File Started: " + event.getFileName());
    }

    @Override
    public void fileFinished(AuditEvent event) {
        // You can handle when a file finishes being checked
        System.out.println("File Finished: " + event.getFileName());
    }

    @Override
    public void addError(AuditEvent event) {
        // Capture the error message from Checkstyle violations
        System.out.println("Error: " + event.getMessage());
    }


    @Override
    public void addException(AuditEvent event, Throwable throwable) {
        // Capture the exception details (if any)
        System.out.println("Exception: " + event.getMessage());
    }
}
