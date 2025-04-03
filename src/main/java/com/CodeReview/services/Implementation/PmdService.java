package com.CodeReview.services.Implementation;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

import net.sourceforge.pmd.*;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import static com.puppycrawl.tools.checkstyle.grammar.javadoc.JavadocLexer.code;

@Service
@RequiredArgsConstructor
public class PmdService {

    public ArrayList<String> pmdReport(File file) {
        try {
            // Save the code to a temporary file

           ArrayList<String> arr = new ArrayList<>();

            // Load the ruleset
            RuleSetFactory ruleSetFactory = new RuleSetFactory();
            RuleSet ruleSet = ruleSetFactory.createRuleSet("C:\\IdeaProjects\\codeR_ashish\\src\\main\\resources\\rulesets\\java\\pmdrules.xml");

            // Configure PMD
            PMDConfiguration config = new PMDConfiguration();
            config.setInputPaths(file.getAbsolutePath());

            config.setRuleSets(Collections.singletonList("C:\\IdeaProjects\\codeR_ashish\\src\\main\\resources\\rulesets\\java\\pmdrules.xml")); // Correct method
            config.setMinimumPriority(RulePriority.valueOf("HIGH"));


            // Run PMD
            int violations = PMD.doPMD(config);

            System.out.println("Violations: " + violations);
            return arr;
            // Cleanup

        } catch (RuleSetNotFoundException e) {
            e.printStackTrace();
        }return null;
    }
}
