package com.CodeReview.services.Implementation;

import lombok.RequiredArgsConstructor;
import net.sourceforge.pmd.PMD;
import net.sourceforge.pmd.PMDConfiguration;
import net.sourceforge.pmd.lang.LanguageRegistry;
import net.sourceforge.pmd.lang.java.JavaLanguageModule;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class PmdService {

    public String sliceString(String s) {
        // Ignore unwanted lines (like processing or summary lines)
        if (s == null || s.startsWith("2") || !s.contains(":")) return null;

        // Find first colon (after the file path) then extract substring
        int firstColon = s.indexOf(":");
        int secondColon = s.indexOf(":", firstColon + 1);
        if (secondColon == -1) return null;

        // Get the useful part after the second colon
        String sliced = s.substring(secondColon + 1).replaceAll("\\t", "    ");
        return sliced.trim();
    }

    public ArrayList<String> pmdAnalyze(File file) {

        try {

            PMDConfiguration config = new PMDConfiguration();

            config.setDefaultLanguageVersion(LanguageRegistry.getLanguage(JavaLanguageModule.NAME).getDefaultVersion());

            config.setIgnoreIncrementalAnalysis(false);
            config.setSourceEncoding("UTF-8");
// ✅ Step 2: Create Renderer (linked internally to config)
            config.setReportFormat("text");

            config.addInputPath(file.getAbsolutePath());
            config.addRuleSet("src/main/resources/reviewConfigs/clean-code.xml");
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintStream ps = new PrintStream(baos);
            PrintStream originalOut = System.out;

            System.setOut(ps);
            PMD.doPMD(config);
            System.out.flush();
            System.setOut(originalOut);

            String pmdOutput = baos.toString(StandardCharsets.UTF_8);

            ArrayList<String> violation = new ArrayList<>(Arrays.asList(pmdOutput.split("\\R")));
            ArrayList<String> violations = new ArrayList<>();
            for (String s : violation) {
                String s1 = sliceString(s);
                if (s1 != null) violations.add(s1);
            }

            return violations;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
