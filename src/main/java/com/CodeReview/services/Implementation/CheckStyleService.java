package com.CodeReview.services.Implementation;


import com.puppycrawl.tools.checkstyle.Checker;
import com.puppycrawl.tools.checkstyle.ConfigurationLoader;
import com.puppycrawl.tools.checkstyle.PropertiesExpander;
import com.puppycrawl.tools.checkstyle.api.AuditEvent;
import com.puppycrawl.tools.checkstyle.api.AuditListener;
import com.puppycrawl.tools.checkstyle.api.Configuration;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.xml.sax.InputSource;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;


@Service
@RequiredArgsConstructor
public class CheckStyleService {

    public ArrayList<String> analyze(File codeFile) {
        try {

            ArrayList<String> errors = new ArrayList<>();
            // Correct way to load Checkstyle config
            InputStream configStream = getClass().getClassLoader().getResourceAsStream("reviewConfigs/custom_checkstyle.xml");
            if (configStream == null) {
                throw new RuntimeException("Checkstyle configuration file not found in resources/static/");
            }

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

                }

                @Override
                public void auditFinished(AuditEvent event) {

                }

                @Override
                public void fileStarted(AuditEvent event) {

                }

                @Override
                public void fileFinished(AuditEvent event) {

                }

                @Override
                public void addError(AuditEvent event) {
                    String error = "ERROR in "+
                            "[Line " + event.getLine() + "] - " + event.getMessage();
                    errors.add(error);
                }

                @Override
                public void addException(AuditEvent event, Throwable throwable) {
                    System.err.println("Exception: " + throwable.getMessage());
                }
            });

            // Run Checkstyle
            checker.process(Collections.singletonList(codeFile));


            return errors;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
