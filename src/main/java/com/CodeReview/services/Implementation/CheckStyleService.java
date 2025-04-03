package com.CodeReview.services.Implementation;


import com.puppycrawl.tools.checkstyle.*;
import com.puppycrawl.tools.checkstyle.api.AuditEvent;
import com.puppycrawl.tools.checkstyle.api.AuditListener;

import com.puppycrawl.tools.checkstyle.api.AutomaticBean;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.xml.sax.InputSource;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import com.puppycrawl.tools.checkstyle.api.Configuration;

import java.io.InputStream;
import java.net.URL;
import java.nio.file.Paths;
import java.util.*;


@Service
@RequiredArgsConstructor
public class CheckStyleService {


    public ArrayList<String> analyze(File codeFile) {
        try {

            ArrayList<String> errors = new ArrayList<>();
            // Correct way to load Checkstyle config
            InputStream configStream = getClass().getClassLoader().getResourceAsStream("static/custom_checkstyle.xml");
            if (configStream == null) {
                throw new RuntimeException("Checkstyle configuration file not found in resources/static/");
            }

            URL configUrl = getClass().getClassLoader().getResource("static/custom_checkstyle.xml");
            System.out.println("Checkstyle config path: " + (configUrl != null ? configUrl.getPath() : "NOT FOUND"));
            // ✅ Read the configuration properly
            InputSource inputSource = new InputSource(configStream);
            Configuration configuration = ConfigurationLoader.loadConfiguration(
                    inputSource,
                    new PropertiesExpander(System.getProperties()),
                    ConfigurationLoader.IgnoredModulesOptions.EXECUTE
            );

            // Set up Checkstyle checker

            Checker checker = new Checker();
            checker.setModuleClassLoader(Thread.currentThread().getContextClassLoader());
            checker.configure(configuration);

            // Add a listener to capture errors
            checker.addListener(new AuditListener() {
                @Override
                public void auditStarted(AuditEvent event) {
                    System.out.println("Audit started...");
                }

                @Override
                public void auditFinished(AuditEvent event) {
                    System.out.println("Audit finished.");
                }

                @Override
                public void fileStarted(AuditEvent event) {
                    System.out.println("Checking file: " + event.getFileName());
                }

                @Override
                public void fileFinished(AuditEvent event) {
                    System.out.println("Finished checking file.");
                }

                @Override
                public void addError(AuditEvent event) {
                    String error = "❌ ERROR in " + event.getFileName() +
                            " [Line " + event.getLine() + "] - " + event.getMessage();
                    errors.add(error);
                }

                @Override
                public void addException(AuditEvent event, Throwable throwable) {
                    System.err.println(" Exception: " + throwable.getMessage());
                }
            });

            // Run Checkstyle
            checker.process(Collections.singletonList(codeFile));

            System.out.println("Checkstyle completed with " + errors.size() + " errors.");
            for(String s: errors) System.out.println(s);
            return errors;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
