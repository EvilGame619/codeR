package com.CodeReview.services;

public interface CodeReviewService {

    String checkStyleReport(String code);

    String pmdReport(String code);

    String spotBugs(String code);

    String aiReport(String code);
}
