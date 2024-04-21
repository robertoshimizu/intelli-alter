import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const article = `Original Investigation Oncology
August 1, 2023
Effect of Exercise on Chemotherapy-Induced Peripheral Neuropathy Among Patients Treated for Ovarian Cancer
A Secondary Analysis of a Randomized Clinical Trial
Anlan Cao, MBBS1; Brenda Cartmel, PhD1,2; Fang-Yong Li, MPH6; et alLinda T. Gottlieb, MA1; Maura Harrigan, MS, RD1; Jennifer A. Ligibel, MD3; Radhika Gogoi, MD, PhD4; Peter E. Schwartz, MD5; Denise A. Esserman, PhD6; Melinda L. Irwin, PhD, MPH1,2; Leah M. Ferrucci, PhD, MPH1,2
Author Affiliations Article Information
JAMA Netw Open. 2023;6(8):e2326463. doi:10.1001/jamanetworkopen.2023.26463
visual abstract icon Visual
Abstract
Secondary analysis of the effect of exercise on chemotherapy-induced peripheral neuropathy (CIPN) among patients treated for ovarian cancer
Key Points
Question  What is the effect of exercise on chemotherapy-induced peripheral neuropathy (CIPN)?

Findings  In this secondary analysis of a randomized clinical trial of 134 patients with ovarian cancer, the self-reported CIPN score was 1.6 points lower in those who were randomized to the exercise intervention compared with the attention control group, indicating significant improvement in CIPN symptoms.

Meaning  Findings of this secondary analysis suggest that exercise is a promising treatment for CIPN and incorporating exercise program referrals into the standard oncology care may reduce CIPN symptoms and increase quality of life for survivors of ovarian cancer.

Abstract
Importance  Chemotherapy-induced peripheral neuropathy (CIPN), one of the most common and severe adverse effects of chemotherapy, is associated with worse quality of life among survivors of ovarian cancer. Currently, there is no effective treatment for CIPN.

Objective  To evaluate the effect of a 6-month aerobic exercise intervention vs attention-control on CIPN among women treated for ovarian cancer in the Women’s Activity and Lifestyle Study in Connecticut (WALC) to provide evidence to inform the guidelines and recommendations for prevention or treatment of CIPN.

Design, Setting, and Participants  This prespecified secondary analysis evaluated the Women’s Activity and Lifestyle Study in Connecticut (WALC), a multicentered, open-label, population-based, phase 3 randomized clinical trial of an aerobic exercise intervention vs attention control for CIPN in patients who were diagnosed with ovarian cancer. Only WALC participants who received chemotherapy were included in this analysis. Participants were randomized 1:1 to either a 6-month aerobic exercise intervention or to attention control. All analyses were conducted between September 2022 and January 2023.

Interventions  The exercise intervention consisted of home-based moderate-intensity aerobic exercise facilitated by weekly telephone counseling from an American College of Sports Medicine/American Cancer Society–certified cancer exercise trainer. Attention control involved weekly health education telephone calls from a WALC staff member.

Main Outcomes and Measure  Change in CIPN was the primary outcome in this secondary analysis. This outcome was represented by CIPN severity, which was self-measured by participants at baseline and 6 months using the Functional Assessment of Cancer Therapy/Gynecologic Oncology Group–Neurotoxicity scale, with a score range of 0 to 44. A mixed-effects model was used to assess the 6-month change in CIPN between the exercise intervention and attention control arms.

Results  Of the 134 participants (all females; mean [SD] age, 57.5 [8.3] years) included in the analysis, 69 were in the exercise intervention arm and 65 were in the attention control arm. The mean (SD) time since diagnosis was 1.7 (1.0) years. The mean (SD) baseline CIPN scores were 8.1 (5.6) in the exercise intervention arm and 8.8 (7.9) in the attention control arm (P = .56). At 6 months, the self-reported CIPN score was reduced by 1.3 (95% CI, −2.3 to −0.2) points in the exercise intervention arm compared with an increase of 0.4 (95% CI, −0.8 to 1.5) points in the attention control arm. The between-group difference was −1.6 (95% CI, −3.1 to −0.2) points. The point estimate was larger among the 127 patients with CIPN symptoms at enrollment (−2.0; 95% CI, −3.6 to −0.5 points).

Conclusions and Relevance  Findings of this secondary analysis of the WALC trial indicate that a 6-month aerobic exercise intervention vs attention control significantly improved self-reported CIPN among patients who were treated for ovarian cancer. While replication of the findings in other studies is warranted, incorporating referrals to exercise programs into standard oncology care could reduce CIPN symptoms and increase quality of life in patients with ovarian cancer.

Trial Registration  ClinicalTrials.gov Identifier: NCT02107066

Introduction
In 2023, there are 19 710 estimated ovarian cancer cases and 13 270 estimated ovarian cancer deaths in the US, making this disease the leading cause of gynecological cancer–related deaths.1 Due to the insidious onset of ovarian cancer and the lack of effective screening tools, 60% of patients with ovarian cancer are diagnosed at late stages.2 The 5-year survival rates for patients with stage III and stage IV epithelial ovarian cancer are 41% and 20%, respectively.2

Approximately 90% of patients with ovarian cancer receive chemotherapy,3 and chemotherapy-induced peripheral neuropathy (CIPN) is one of the most common and severe adverse effects of this treatment. The definition of CIPN is damage to sensory, motor, and autonomic neurons4 that leads to altered perception of touch, pain, and sense of position and vibration5 or to damaged voluntary movement and coordination.6,7 Prevalence of CIPN among individuals with ovarian cancer undergoing chemotherapy ranges from 30% to 70%.8-10 Approximately 60% to 70% of patients receiving paclitaxel, the first-line chemotherapy regimen for ovarian cancer, experience CIPN.11 In addition, CIPN can develop or persist after treatment. Approximately 51% of survivors of ovarian cancer reported CIPN symptoms 2 to 12 years after diagnosis.12

There is no gold standard for CIPN assessment, and clinical diagnosis is made from patient self-report and medical history.13 Because of pain and sensory impairment, CIPN has been associated with worse quality of life14,15 and physical function15 among individuals with ovarian cancer. Currently, there are no effective drugs or therapies for preventing or treating CIPN,7,13 except for duloxetine for painful CIPN, but it has limited benefits.13 Approaches for attenuating CIPN during chemotherapy include dose delay, dose reduction, drug substitutions, or stopping chemotherapy.13 However, chemotherapy dose reductions and/or delays have been associated with worse ovarian cancer survival.16-23 Therefore, pursuit of effective treatment for CIPN is warranted to not only improve quality of life during and after treatment but also potentially increase survival via chemotherapy adherence.

Exercise therapy is a potential treatment for CIPN. A cross-sectional survey found a nonstatistically significant inverse association between physical activity and CIPN in 359 participants treated for ovarian cancer.24 Nine small randomized clinical trials (RCTs)25-33 with no more than 61 participants and 2 larger RCTs with 170 participants34 and 350 participants35 have investigated the effect of exercise on CIPN symptoms in multiple cancer types both during and after chemotherapy completion, yet CIPN as a composite outcome was comprehensively measured in only 4 of these trials.26,29,31,34 Various aspects of CIPN, such as neuropathic pain,32,33 balance,25,28-30 and sensory symptoms,27,34,35 were improved in some of the studies. However, a meta-analysis of the 4 trials with CIPN as a composite outcome26,29,31,34 found no significant improvement associated with exercise.36 To date, no study has examined whether an exercise intervention affects CIPN in patients diagnosed with ovarian cancer. The American Society of Clinical Oncology guideline on CIPN indicated that exercise therapy was potentially beneficial for CIPN treatment, but no recommendation could be made for survivors of any type of cancer due to the lack of evidence.13 Thus, research is needed to evaluate the efficacy and clarify the risks of exercise for treating CIPN. In this secondary analysis of the Women’s Activity and Lifestyle Study in Connecticut (WALC) RCT,37 we assessed the effect of a 6-month aerobic exercise intervention vs attention control on CIPN among patients who had received chemotherapy for ovarian cancer to provide evidence to inform the guidelines and recommendations for prevention or treatment of CIPN.

Methods
This prespecified secondary analysis (trial protocol in Supplement 1) was approved by the Connecticut Department of Public Health; the Yale Human Investigation Committees; and the institutional review boards of Dana-Farber/Harvard Cancer Center, Geisinger Health System, and 21 Connecticut hospital sites. All participants provided written informed consent. We followed the Consolidated Standards of Reporting Trials (CONSORT) reporting guideline.

Recruitment and Randomization
From May 1, 2010, to March 20, 2014, patients who were diagnosed with ovarian cancer and living in Connecticut were recruited to the WALC trial using the Rapid Case Ascertainment Shared Resource of the Yale Cancer Center, a field agent of the Connecticut Tumor Registry that identified patients with ovarian cancer from all hospitals in Connecticut. Individuals were also recruited at 2 additional study sites: Dana-Farber Cancer Institute in Boston, Massachusetts, and Geisinger Health System in Danville, Pennsylvania. Some patients living outside Connecticut learned about WALC trial through national support groups, physicians, or brochures in clinic waiting rooms and were screened via telephone. If eligible and interested, participants completed baseline questionnaires and were randomized 1:1 to a 6-month exercise intervention arm or an attention control arm.

Eligibility criteria included (1) ability to speak English, (2) aged 18 to 75 years, (3) diagnosis of stage I to stage IV invasive epithelial ovarian cancer within the past 4 years, (4) completion of chemotherapy (if received) at least 1 month prior to randomization, (5) current exercise routine of less than 90 minutes per week, and (6) receipt of physician consent to start an exercise program. Randomization was block stratified by disease stage (stage I and II vs stage III and IV) and age (≥55 vs <55 years).37﻿ Figure 1 shows the study flow diagram.

Data Collection
Self-reported sociodemographic characteristics, disease stage, time since diagnosis, chemotherapy, treatment status, and history of recurrence were collected at baseline, with additional physician verification of clinical information. Race and ethnicity data were self-reported by participants and included Asian, Hispanic, Native American, non-Hispanic Black, non-Hispanic White, and other (including Hispanic White and non-Hispanic mixed White and African American). Race and ethnicity were collected to ensure the balance of these characteristics between randomized groups. Baseline physical activity levels were assessed using the validated Modifiable Activity Questionnaire.38

To determine their CIPN score, participants completed the Functional Assessment of Cancer Therapy/Gynecologic Oncology Group–Neurotoxicity (FACT/GOG-Ntx) scale at baseline and 6 months. The FACT/GOG-Ntx scale provides a measure specifically for CIPN symptoms, including sensory, motor, and auditory problems.39 This questionnaire contains 11 items that can be rated on a 5-point Likert scale, from 0 (indicating disagreement: not at all) to 4 (indicating total agreement: very much). Total CIPN scores range from 0 to 44, with higher scores indicating greater CIPN symptoms. The FACT/GOG-Ntx scale has been shown to be reliable, with content validity and concurrent validity and sensitivity to change over time as well as responsiveness to evaluate CIPN among patients treated with chemotherapy.39

Intervention
The exercise intervention consisted of home-based moderate-intensity aerobic exercise facilitated by weekly telephone calls from an American College of Sports Medicine/American Cancer Society–certified cancer exercise trainer. Participants were counseled on increasing exercise to 150 minutes per week of moderate-intensity aerobic exercise, mainly via brisk walking. Adherence was measured using self-reported 7-day daily activity logs on the type and duration of exercise. Participants reported their exercise levels during weekly telephone calls with the exercise trainer. Using a 26-chapter WALC book informed by Social Cognitive Theory,40 the exercise trainer provided weekly telephone counseling during which educational topics on exercise and ovarian cancer health were discussed to increase participants’ exercise levels.

The attention control arm received weekly telephone calls from a WALC staff member to discuss ovarian cancer health education topics. Additionally, participants received a 26-chapter book that contained only ovarian cancer survivorship–related information.

Statistical Analysis
Sample size for WALC was based on detecting a 10% difference in the change in the primary outcome (quality of life).37 This sample size achieved 80% power, with α = .05 to detect a standardized effect size of 0.50 (Cohen d) between the arms for secondary outcomes, including CIPN.

Baseline characteristics were presented as means (SDs) or percentages and were compared using an unpaired, 2-tailed t test, χ2 test, or Fisher exact test, as appropriate. A mixed-model repeated measures analysis was conducted to evaluate the 6-month change in CIPN score between participants in the exercise intervention arm vs participants in the attention control arm, and baseline measures were retained as part of the response profile. We chose an unstructured covariance matrix to model the correlations within repeated assessments for the same individual. Linear contrasts were used to obtain the change in CIPN score in each group and group differences, while baseline values of the 2 arms were constrained to be equal.41 Least squares means (LS means) and 95% CIs were estimated from the models. Variables associated with missing data at 6 months, including study site and recurrence before and during study, were included as covariates. Results with or without adjustment were similar, thus only adjusted results are presented. The effect of exercise on patients with CIPN symptoms at baseline was examined in a sensitivity analysis. Effect modification by baseline CIPN score, counseling session attendance, and selected baseline characteristics was explored.

All analyses were conducted between September 2022 and January 2023, using SAS, version 9.4 (SAS Institute Inc). Statistical tests were 2-sided, with a P < .05 significance level.

Results
In the WALC trial, 144 participants were randomized to the exercise intervention arm (n = 74) or attention control arm (n = 70). Ten patients (6.9%; 5 in each arm) did not receive chemotherapy, leaving 134 patients for inclusion in this secondary analysis (Figure 1). Among these 134 patients, the mean (SD) age was 57.5 (8.3) years (Table 1). No statistically significant differences in baseline characteristics were observed between the study arms. The mean (SD) time since diagnosis was 1.7 (1.0) years. Most participants had non-Hispanic White race and ethnicity (127 [94.8%]), were employed (67 [50.4%]), were married or living with a partner (99 [73.9%]), and received college or advanced degrees (77 [57.5%]).

Most participants were diagnosed at stage III or IV (78 [58.2%]), received carboplatin plus paclitaxel therapy (82 [82.0%]), and did not have disease recurrence (111 [82.8%]). Thirty-six patients (29.0%) received chemotherapy during the study because they were receiving maintenance chemotherapy or went back on chemotherapy due to disease recurrence. The mean (SD) physical activity level at baseline was 28.1 (42.4) minutes per week, and the mean (SD) self-reported body mass index (calculated as weight in kilograms divided by height in meters squared) was 29.4 (7.1). Those who did not receive chemotherapy (n = 10) had similar characteristics to those who received chemotherapy, except for disease stage (eTable 1 in Supplement 2).

Out of a possible total score of 44 on the FACT/GOG-Ntx questionnaire, the mean (SD) CIPN score at baseline was 8.4 (6.8) (exercise: 8.1 [5.6]; control: 8.8 [7.9]; P = .56) (Table 1). Additionally, 127 participants (94.8%) had at least 1 CIPN symptom at baseline. Numbness or tingling in feet, discomfort in feet, and joint pain or muscle cramps were the most common CIPN components reported by participants (eTable 2 in Supplement 2).

By the end of the exercise intervention, 58 patients (83.8%) met 80% of the exercise goal, and according to the daily activity logs, the mean (SD) exercise time during the study was 166.0 (66.1) minutes per week. There were no adverse events or reactions reported by participants. After the intervention, the CIPN score was reduced from baseline by 1.3 (95% CI, −2.3 to −0.2) points in the exercise intervention arm, a decrease of 16%. No significant 6-month change in CIPN score was observed in the attention control arm (0.4; 95% CI, −0.8 to 1.5 points) (Table 2). The between-group difference in CIPN score was −1.6 points (95% CI, −3.1 to −0.2 points; P = .03). Discomfort in feet, joint pain or muscle cramps, and an overall weak feeling were CIPN components that were reported by participants as being the most improved by the exercise intervention (Figure 2).

In an analysis restricted to patients who reported at least 1 CIPN symptom at baseline (n = 127), a greater CIPN score reduction (−1.6; 95% CI, −2.8 to −0.5 points) was observed in the exercise intervention arm, a decrease of 19%, whereas the change in the attention control arm was similar to that in the primary analysis (0.4; 95% CI, −0.8 to 1.5 points) (Table 2). The overall treatment effect was greater among these 127 participants (−2.0; 95% CI, −3.6 to −0.5 points; P = .01). There was no evidence of effect modification by baseline CIPN score, counseling session attendance, disease stage, chemotherapy, baseline body mass index, age, or time since diagnosis (Table 3).

Discussion
We found that a 6-month aerobic exercise intervention significantly improved self-reported CIPN compared with attention control among patients who had completed chemotherapy for ovarian cancer. We observed a significant between-group difference in self-reported CIPN score of −1.6 points, with the score improving by 1.3 points, a reduction of 16%, in the exercise intervention arm; meanwhile, there was a nonsignificant 0.4-point increase among attention control participants. As reported previously, most participants who were randomized to the exercise intervention in the WALC trial were able to meet the exercise goals, with no reported adverse events.37,42,43

While data were limited on CIPN specific to survivors of ovarian cancer using the FACT/GOG-Ntx scale, Stevinson et al24 reported a mean (SD) CIPN score of 9.9 (0.6) among 192 sedentary patients who had been treated for ovarian cancer, which was slightly higher than the mean (SD) baseline score of 8.4 (6.8) in the present study. The 1.3-point reduction in CIPN score with exercise would correspond with a 1-level improvement on the Likert scale in a specific domain. For example, a 1-level improvement in discomfort in feet could indicate that the individual used to feel quite a bit of discomfort but now reported somewhat discomfort, or a similar change from a little bit to not at all. Previously, we found that aerobic exercise improved health-related quality of life (HRQOL), the primary outcome of the WALC trial, as measured by the Physical Component Summary score of the 36-item Short Form Health Survey, version 1 (RAND Corp).37 We assessed the potential relationship between CIPN and HRQOL in this trial population by evaluating the association between change in CIPN score and change in physical or mental HRQOL. We found that improvements in CIPN were distinct from HRQOL improvements as there was no significant association between the change in CIPN and the change in HRQOL.

Four RCTs assessed the effects of exercise on CIPN symptoms in posttreatment survivors of cancer,30-33 but they were limited by smaller sample sizes and shorter study durations compared with the present trial. Kneis et al31 compared a 12-week, twice-weekly endurance plus balance training vs endurance training in 50 patients with cancer and persistent CIPN. Four patients were diagnosed with gynecological cancer (cancer types not stated).31 No significant group difference was found in CIPN symptoms, which were assessed using objective measurements and self-report, but only 74.0% attained 70% or greater compliance in Kneis et al31 compared with 83.8% individuals adhering to 80% of the exercise goal in the present secondary analysis. In Schwenk et al,30 the RCT among 22 older individuals (mean age, 70.3 years) with different types of cancer diagnosis (1 with ovarian cancer) and objectively confirmed CIPN compared a 4-week, twice-weekly motor adaptation balance training program with usual care. Sway of hip, ankle, and center of mass were significantly reduced in the intervention group compared with the control group.30 Streckmann et al32 conducted a 4-arm RCT (with 10 people in each arm) to compare sensorimotor training vs sensorimotor training plus whole-body vibration training vs oncologic control vs healthy control. Among the 30 individuals with cancer, only 3 had ovarian cancer. The CIPN symptoms were objectively measured at enrollment and after 6 weeks of twice-weekly intervention. Tendon reflexes, peripheral deep sensitivity, and pain were significantly improved in the 2 exercise arms compared with the 2 control arms.32 Similar to Streckmann et al,32 we found improvement in pain, although pain was self-reported in this study whereas CIPN was assessed objectively in both Schwenk et al30 and Streckmann et al.32 While objective assessment may be important to fully understand CIPN, self-reported symptoms of CIPN best captures patients’ experiences. Dhawan et al33 enrolled 45 survivors of cancer with CIPN, 28 of whom had ovarian cancer, to assess the effect of a 10-week home-based muscle strengthening plus balancing exercises vs control on CIPN using self-reports and nerve conduction velocity test. Significant reduction in neuropathic pain scores was observed,33 a finding that was consistent with that in the present secondary analysis of the WALC trial.

None of the previous trials30-33 incorporated aerobic exercise. Balance or strength training usually requires certain equipment, but aerobic exercise (such as brisk walking in the present intervention) is more feasible and may be more acceptable for survivors of cancer and requires less cost and effort.

The significant attenuation in CIPN symptoms in the exercise intervention arm could be attributed to both objective improvements in neural functions and subjective improvements in participant perception of these CIPN components. Streckmann et al32 reported improved tendon reflexes and peripheral deep sensitivity via objective physical examinations, indicating that exercise might improve neural functions clinically. Physiologically, the potential pathways of aerobic exercise affecting CIPN include increase of blood flow and release of endorphins,44 reduction of axonal degeneration, increase of neurotrophic factors, and improvement of mitochondria and oxidative profile.45

When patients report CIPN symptoms, chemotherapy dose and schedules may be altered to reduce neurotoxic effects. Since chemotherapy dose reductions and dose delays are associated with higher ovarian cancer mortality,16-23 minimizing the dose-limiting effects of CIPN is crucial to potentially improved outcome. Findings of the present secondary analysis suggest that exercise is a viable intervention. However, since the data we used were limited to the posttreatment period, future studies are needed to evaluate the role of exercise in CIPN prevention immediately after cancer diagnosis.

When restricted to participants who had CIPN symptoms at enrollment, we observed a larger effect size with exercise (−2.0; 95% CI, −3.6 to −0.5). Since 94.8% of participants had at least 1 CIPN symptom at baseline, we could not evaluate an interaction by CIPN symptoms at baseline or determine whether the exercise intervention could prevent CIPN among participants without CIPN at enrollment.

Strengths and Limitations
The WALC RCT, to our knowledge, was the largest randomized study of exercise among patients treated for ovarian cancer and was the only study assessing the effect of exercise on CIPN in this population. We rigorously controlled for the potentially beneficial effect of attention from interventionists with an attention control comparison group. The exercise intervention was mapped directly to the American Cancer Society lifestyle recommendations for survivors of cancer,46 and use of self-reported measurement of CIPN corresponded to current clinical practice. Findings indicated the potential for exercise as a minimal risk treatment for CIPN in patients with ovarian cancer after chemotherapy treatment.13

This secondary analysis of the WALC trial also had several limitations. More than 90% of the study sample was composed of non-Hispanic White individuals, and all participants spoke English, limiting the ability to generalize findings to diverse populations.2 Because CIPN was a secondary outcome for the WALC trial, replication in other ovarian cancer trials with CIPN as the primary outcome is warranted to confirm the benefit we observed. We did not objectively assess CIPN, and a clinically meaningful cutoff point for the self-reported FACT/GOG-Ntx scale has not been described in the literature. Neural function measured by physical examinations would be a valuable addition to better understand the effect of exercise on CIPN. Additionally, we had limited power for subgroup and interaction analyses.

Conclusions
In the WALC trial, a 6-month aerobic exercise intervention significantly improved self-reported CIPN among patients who had been treated with chemotherapy for ovarian cancer compared with the attention control group. The study provides evidence of the potential benefit of exercise in attenuating a common chemotherapy adverse effect for which there is no accepted treatment. Incorporating referrals to exercise programs into the standard oncology care for patients with ovarian cancer could attenuate CIPN symptoms and increase quality of life. Exercise could also prolong survival by improving chemotherapy adherence, if future studies show the effects of exercise on preventing CIPN during chemotherapy for patients with ovarian cancer.

Back to top
Article Information
Accepted for Publication: June 20, 2023.

Published: August 1, 2023. doi:10.1001/jamanetworkopen.2023.26463

Open Access: This is an open access article distributed under the terms of the CC-BY License. © 2023 Cao A et al. JAMA Network Open.

Corresponding Author: Anlan Cao, MBBS, Department of Chronic Disease Epidemiology, Yale School of Public Health, 60 College St, New Haven, CT 06520-803 (anlan.cao@yale.edu).

Author Contributions: Drs Irwin and Ferrucci had full access to all of the data in the study and take responsibility for the integrity of the data and the accuracy of the data analysis.

Concept and design: Ligibel, Schwartz, Esserman, Irwin, Ferrucci.

Acquisition, analysis, or interpretation of data: All authors.

Drafting of the manuscript: Cao.

Critical review of the manuscript for important intellectual content: All authors.

Statistical analysis: Cao, Li, Esserman.

Obtained funding: Irwin.

Administrative, technical, or material support: Cartmel, Harrigan, Gogoi, Schwartz, Ferrucci.

Supervision: Gogoi, Esserman, Irwin, Ferrucci.

Conflict of Interest Disclosures: Dr Cartmel reported receiving grants from National Cancer Institute during the conduct of the study. Dr Esserman reported receiving grants from the National Institutes of Health (NIH) during the conduct of the study. Dr Ferrucci reported receiving grants from National Cancer Institute during the conduct of the study. No other disclosures were reported.

Funding/Support: This study was supported by grants NCI 5R01CA138556 and P30 CA016359 from the National Cancer Institute at the NIH, grant UL1TR000142 from the National Center for Advancing Translational Science at the NIH, and grant P30AG021342 from the Yale Claude D. Pepper Older Americans Independence Center.

Role of the Funder/Sponsor: The funders had no role in the design and conduct of the study; collection, management, analysis, and interpretation of the data; preparation, review, or approval of the manuscript; and decision to submit the manuscript for publication.

Data Sharing Statement: See Supplement 3.

Additional Contributions: Certain data were collected from the Connecticut Tumor Registry located in the Connecticut Department of Public Health. We thank all of the study participants and physicians; Rajni Mehta, MPH, Director of the Rapid Case Ascertainment Shared Resource, Yale Cancer Center; and the following Connecticut hospitals: Charlotte Hungerford Hospital, Bridgeport Hospital, Danbury Hospital, Hartford Hospital, Middlesex Hospital, New Britain General Hospital, Bradley Memorial Hospital, Yale/New Haven Hospital, St Francis Hospital and Medical Center, St Mary’s Hospital, Hospital of St Raphael, St Vincent’s Medical Center, Stamford Hospital, William W. Backus Hospital, Windham Hospital, Eastern Connecticut Health Network, Griffin Hospital, Bristol Hospital, Johnson Memorial Hospital, Day Kimball Hospital, Greenwich Hospital, Lawrence and Memorial Hospital, Milford Hospital, New Milford Hospital, Norwalk Hospital, Sharon Hospital, and Waterbury Hospital. None of these groups and individuals were financially compensated for their contributions.

References
1.
Siegel  RL﻿, Miller  KD﻿, Wagle  NS﻿, Jemal  A﻿.  Cancer statistics, 2023. ﻿  CA Cancer J Clin. 2023;73(1):17-48. doi:10.3322/caac.21763﻿PubMedGoogle ScholarCrossref
2.
Torre  LA﻿, Trabert  B﻿, DeSantis  CE﻿,  et al.  Ovarian cancer statistics, 2018. ﻿  CA Cancer J Clin. 2018;68(4):284-296. doi:10.3322/caac.21456﻿PubMedGoogle ScholarCrossref
3.
Kim  A﻿, Ueda  Y﻿, Naka  T﻿, Enomoto  T﻿.  Therapeutic strategies in epithelial ovarian cancer. ﻿  J Exp Clin Cancer Res. 2012;31(1):14. doi:10.1186/1756-9966-31-14﻿PubMedGoogle ScholarCrossref
4.
Gutiérrez-Gutiérrez  G﻿, Sereno  M﻿, Miralles  A﻿, Casado-Sáenz  E﻿, Gutiérrez-Rivas  E﻿.  Chemotherapy-induced peripheral neuropathy: clinical features, diagnosis, prevention and treatment strategies. ﻿  Clin Transl Oncol. 2010;12(2):81-91. doi:10.1007/S12094-010-0474-z﻿PubMedGoogle ScholarCrossref
5.
Chaudhry  V﻿, Chaudhry  M﻿, Crawford  TO﻿, Simmons-O’Brien  E﻿, Griffin  JW﻿.  Toxic neuropathy in patients with pre-existing neuropathy. ﻿  Neurology. 2003;60(2):337-340. doi:10.1212/01.WNL.0000043691.53710.53﻿PubMedGoogle ScholarCrossref
6.
Malik  B﻿, Stillman  M﻿.  Chemotherapy-induced peripheral neuropathy. ﻿  Curr Neurol Neurosci Rep. 2008;8(1):56-65. doi:10.1007/s11910-008-0010-5﻿PubMedGoogle ScholarCrossref
7.
Brown  TJ﻿, Sedhom  R﻿, Gupta  A﻿.  Chemotherapy-induced peripheral neuropathy. ﻿  JAMA Oncol. 2019;5(5):750-750. doi:10.1001/jamaoncol.2018.6771﻿
ArticlePubMedGoogle ScholarCrossref
8.
Lee  CK﻿, Gurney  H﻿, Brown  C﻿,  et al.  Carboplatin-paclitaxel-induced leukopenia and neuropathy predict progression-free survival in recurrent ovarian cancer. ﻿  Br J Cancer. 2011;105(3):360-365. doi:10.1038/bjc.2011.256﻿PubMedGoogle ScholarCrossref
9.
Jing  Y﻿, Lv  HY﻿, Feng  SW﻿.  The trend of chemotherapy-induced peripheral neurotoxicity in ovarian cancer survivors and its impacts on daily life during and one year after treatment. ﻿  Eur J Gynaecol Oncol. 2016;37(5):696-699.PubMedGoogle Scholar
10.
Jin  L﻿, Zhang  Y﻿, Yang  W﻿.  Chemotherapy-induced peripheral neuropathy among patients with ovarian cancer. ﻿  Int J Gynaecol Obstet. 2020;149(3):303-308. doi:10.1002/ijgo.13137﻿PubMedGoogle ScholarCrossref
11.
Seretny  M﻿, Currie  GL﻿, Sena  ES﻿,  et al.  Incidence, prevalence, and predictors of chemotherapy-induced peripheral neuropathy: a systematic review and meta-analysis. ﻿  Pain. 2014;155(12):2461-2470. doi:10.1016/j.pain.2014.09.020﻿PubMedGoogle ScholarCrossref
12.
Ezendam  NP﻿, Pijlman  B﻿, Bhugwandass  C﻿,  et al.  Chemotherapy-induced peripheral neuropathy and its impact on health-related quality of life among ovarian cancer survivors: results from the population-based PROFILES registry. ﻿  Gynecol Oncol. 2014;135(3):510-517. doi:10.1016/j.ygyno.2014.09.016﻿PubMedGoogle ScholarCrossref
13.
Loprinzi  CL﻿, Lacchetti  C﻿, Bleeker  J﻿,  et al.  Prevention and management of chemotherapy-induced peripheral neuropathy in survivors of adult cancers: ASCO guideline update. ﻿  J Clin Oncol. 2020;38(28):3325-3348. doi:10.1200/JCO.20.01399﻿PubMedGoogle ScholarCrossref
14.
Mayer  DK﻿, Nasso  SF﻿, Earp  JA﻿.  Defining cancer survivors, their needs, and perspectives on survivorship health care in the USA. ﻿  Lancet Oncol. 2017;18(1):e11-e18. doi:10.1016/S1470-2045(16)30573-3﻿PubMedGoogle ScholarCrossref
15.
Bonhof  CS﻿, Mols  F﻿, Vos  MC﻿,  et al.  Course of chemotherapy-induced peripheral neuropathy and its impact on health-related quality of life among ovarian cancer patients: a longitudinal study. ﻿  Gynecol Oncol. 2018;149(3):455-463. doi:10.1016/j.ygyno.2018.03.052﻿PubMedGoogle ScholarCrossref
16.
Fauci  JM﻿, Whitworth  JM﻿, Schneider  KE﻿,  et al.  Prognostic significance of the relative dose intensity of chemotherapy in primary treatment of epithelial ovarian cancer. ﻿  Gynecol Oncol. 2011;122(3):532-535. doi:10.1016/j.ygyno.2011.05.023﻿PubMedGoogle ScholarCrossref
17.
Hanna  RK﻿, Poniewierski  MS﻿, Laskey  RA﻿,  et al.  Predictors of reduced relative dose intensity and its relationship to mortality in women receiving multi-agent chemotherapy for epithelial ovarian cancer. ﻿  Gynecol Oncol. 2013;129(1):74-80. doi:10.1016/j.ygyno.2012.12.017﻿PubMedGoogle ScholarCrossref
18.
Au-Yeung  G﻿, Webb  PM﻿, DeFazio  A﻿, Fereday  S﻿, Bressel  M﻿, Mileshkin  L﻿.  Impact of obesity on chemotherapy dosing for women with advanced stage serous ovarian cancer in the Australian Ovarian Cancer Study (AOCS). ﻿  Gynecol Oncol. 2014;133(1):16-22. doi:10.1016/j.ygyno.2014.01.030﻿PubMedGoogle ScholarCrossref
19.
Bandera  EV﻿, Lee  VS﻿, Rodriguez-Rodriguez  L﻿, Powell  CB﻿, Kushi  LH﻿.  Impact of chemotherapy dosing on ovarian cancer survival according to body mass index. ﻿  JAMA Oncol. 2015;1(6):737-745. doi:10.1001/jamaoncol.2015.1796﻿
ArticlePubMedGoogle ScholarCrossref
20.
Anuradha  S﻿, Donovan  PJ﻿, Webb  PM﻿,  et al.  Variations in adjuvant chemotherapy and survival in women with epithelial ovarian cancer - a population-based study. ﻿  Acta Oncol. 2016;55(2):226-233. doi:10.3109/0284186X.2015.1054950﻿PubMedGoogle ScholarCrossref
21.
Denduluri  N﻿, Lyman  GH﻿, Wang  Y﻿,  et al.  Chemotherapy dose intensity and overall survival among patients with advanced breast or ovarian cancer. ﻿  Clin Breast Cancer. 2018;18(5):380-386. doi:10.1016/j.clbc.2018.02.003﻿PubMedGoogle ScholarCrossref
22.
Olawaiye  AB﻿, Java  JJ﻿, Krivak  TC﻿,  et al.  Does adjuvant chemotherapy dose modification have an impact on the outcome of patients diagnosed with advanced stage ovarian cancer? An NRG Oncology/Gynecologic Oncology Group study. ﻿  Gynecol Oncol. 2018;151(1):18-23. doi:10.1016/j.ygyno.2018.07.021﻿PubMedGoogle ScholarCrossref
23.
Starbuck  KD﻿, Szender  JB﻿, Duncan  WD﻿,  et al.  Prognostic impact of adjuvant chemotherapy treatment intensity for ovarian cancer. ﻿  PLoS One. 2018;13(11):e0206913. doi:10.1371/journal.pone.0206913﻿PubMedGoogle ScholarCrossref
24.
Stevinson  C﻿, Steed  H﻿, Faught  W﻿,  et al.  Physical activity in ovarian cancer survivors: associations with fatigue, sleep, and psychosocial functioning. ﻿  Int J Gynecol Cancer. 2009;19(1):73-78. doi:10.1111/IGC.0b013e31819902ec﻿PubMedGoogle ScholarCrossref
25.
Streckmann  F﻿, Kneis  S﻿, Leifert  JA﻿,  et al.  Exercise program improves therapy-related side-effects and quality of life in lymphoma patients undergoing therapy. ﻿  Ann Oncol. 2014;25(2):493-499. doi:10.1093/annonc/mdt568﻿PubMedGoogle ScholarCrossref
26.
Zimmer  P﻿, Trebing  S﻿, Timmers-Trebing  U﻿,  et al.  Eight-week, multimodal exercise counteracts a progress of chemotherapy-induced peripheral neuropathy and improves balance and strength in metastasized colorectal cancer patients: a randomized controlled trial. ﻿  Support Care Cancer. 2018;26(2):615-624. doi:10.1007/s00520-017-3875-5﻿PubMedGoogle ScholarCrossref
27.
Bland  KA﻿, Kirkham  AA﻿, Bovard  J﻿,  et al.  Effect of exercise on taxane chemotherapy-induced peripheral neuropathy in women with breast cancer: a randomized controlled trial. ﻿  Clin Breast Cancer. 2019;19(6):411-422. doi:10.1016/j.clbc.2019.05.013﻿PubMedGoogle ScholarCrossref
28.
Andersen Hammond  E﻿, Pitz  M﻿, Steinfeld  K﻿, Lambert  P﻿, Shay  B﻿.  An exploratory randomized trial of physical therapy for the treatment of chemotherapy-induced peripheral neuropathy. ﻿  Neurorehabil Neural Repair. 2020;34(3):235-246. doi:10.1177/1545968319899918﻿PubMedGoogle ScholarCrossref
29.
Saraboon  C﻿, Siriphorn  A﻿.  Effects of foam pad balance exercises on cancer patients undergoing chemotherapy: a randomized control trial. ﻿  J Bodyw Mov Ther. 2021;28:164-171. doi:10.1016/j.jbmt.2021.07.013﻿PubMedGoogle ScholarCrossref
30.
Schwenk  M﻿, Grewal  GS﻿, Holloway  D﻿, Muchna  A﻿, Garland  L﻿, Najafi  B﻿.  Interactive sensor-based balance training in older cancer patients with chemotherapy-induced peripheral neuropathy: a randomized controlled trial. ﻿  Gerontology. 2016;62(5):553-563. doi:10.1159/000442253﻿PubMedGoogle ScholarCrossref
31.
Kneis  S﻿, Wehrle  A﻿, Müller  J﻿,  et al.  It’s never too late - balance and endurance training improves functional performance, quality of life, and alleviates neuropathic symptoms in cancer survivors suffering from chemotherapy-induced peripheral neuropathy: results of a randomized controlled trial. ﻿  BMC Cancer. 2019;19(1):414. doi:10.1186/s12885-019-5522-7﻿PubMedGoogle ScholarCrossref
32.
Streckmann  F﻿, Lehmann  HC﻿, Balke  M﻿,  et al.  Sensorimotor training and whole-body vibration training have the potential to reduce motor and sensory symptoms of chemotherapy-induced peripheral neuropathy-a randomized controlled pilot trial. ﻿  Support Care Cancer. 2019;27(7):2471-2478. doi:10.1007/s00520-018-4531-4﻿PubMedGoogle ScholarCrossref
33.
Dhawan  S﻿, Andrews  R﻿, Kumar  L﻿, Wadhwa  S﻿, Shukla  G﻿.  A randomized controlled trial to assess the effectiveness of muscle strengthening and balancing exercises on chemotherapy-induced peripheral neuropathic pain and quality of life among cancer patients. ﻿  Cancer Nurs. 2020;43(4):269-280. doi:10.1097/NCC.0000000000000693﻿PubMedGoogle ScholarCrossref
34.
Müller  J﻿, Weiler  M﻿, Schneeweiss  A﻿,  et al.  Preventive effect of sensorimotor exercise and resistance training on chemotherapy-induced peripheral neuropathy: a randomised-controlled trial. ﻿  Br J Cancer. 2021;125(7):955-965. doi:10.1038/s41416-021-01471-1﻿PubMedGoogle ScholarCrossref
35.
Kleckner  IR﻿, Kamen  C﻿, Gewandter  JS﻿,  et al.  Effects of exercise during chemotherapy on chemotherapy-induced peripheral neuropathy: a multicenter, randomized controlled trial. ﻿  Support Care Cancer. 2018;26(4):1019-1028. doi:10.1007/s00520-017-4013-0﻿PubMedGoogle ScholarCrossref
36.
Guo  S﻿, Han  W﻿, Wang  P﻿, Wang  X﻿, Fang  X﻿.  Effects of exercise on chemotherapy-induced peripheral neuropathy in cancer patients: a systematic review and meta-analysis. ﻿  J Cancer Surviv. 2023;17(2):318-331. doi:10.1007/s11764-022-01182-3PubMedGoogle ScholarCrossref
37.
Zhou  Y﻿, Cartmel  B﻿, Gottlieb  L﻿,  et al.  Randomized trial of exercise on quality of life in women with ovarian cancer: Women’s Activity and Lifestyle Study in Connecticut (WALC). ﻿  J Natl Cancer Inst. 2017;109(12):djx072. doi:10.1093/jnci/djx072﻿PubMedGoogle ScholarCrossref
38.
Kriska  AM﻿, Knowler  WC﻿, LaPorte  RE﻿,  et al.  Development of questionnaire to examine relationship of physical activity and diabetes in Pima Indians. ﻿  Diabetes Care. 1990;13(4):401-411. doi:10.2337/diacare.13.4.401﻿PubMedGoogle ScholarCrossref
39.
Cheng  HL﻿, Lopez  V﻿, Lam  SC﻿,  et al.  Psychometric testing of the Functional Assessment of Cancer Therapy/Gynecologic Oncology Group-Neurotoxicity (FACT/GOG-Ntx) subscale in a longitudinal study of cancer patients treated with chemotherapy. ﻿  Health Qual Life Outcomes. 2020;18(1):246. doi:10.1186/s12955-020-01493-y﻿PubMedGoogle ScholarCrossref
40.
Bandura  A﻿.  Social cognitive theory: an agentic perspective. ﻿  Annu Rev Psychol. 2001;52:1-26. doi:10.1146/annurev.psych.52.1.1﻿PubMedGoogle ScholarCrossref
41.
Fitzmaurice  GM﻿, Laird  NM﻿, Ware  JH﻿.  Applied Longitudinal Analysis. 2nd ed. John Wiley & Sons; 2011.
42.
Cao  A﻿, Cartmel  B﻿, Li  FY﻿,  et al.  Effect of exercise on body composition among women with ovarian cancer. ﻿  J Cancer Surviv. Published online April 4, 2022. doi:10.1007/s11764-022-01207-x﻿PubMedGoogle ScholarCrossref
43.
Cao  A﻿, Cartmel  B﻿, Li  FY﻿,  et al.  Exercise adherence in a randomized controlled trial of exercise on quality of life in ovarian cancer survivors. ﻿  J Cancer Surviv. 2023;17(2):535-543. doi:10.1007/s11764-022-01325-6PubMedGoogle ScholarCrossref
44.
Heijnen  S﻿, Hommel  B﻿, Kibele  A﻿, Colzato  LS﻿.  Neuromodulation of aerobic exercise-a review. ﻿  Front Psychol. 2016;6:1890. doi:10.3389/fpsyg.2015.01890﻿PubMedGoogle ScholarCrossref
45.
Chung  KH﻿, Park  SB﻿, Streckmann  F﻿,  et al.  Mechanisms, mediators, and moderators of the effects of exercise on chemotherapy-induced peripheral neuropathy. ﻿  Cancers (Basel). 2022;14(5):1224. doi:10.3390/cancers14051224﻿PubMedGoogle ScholarCrossref
46.
Rock  CL﻿, Thomson  CA﻿, Sullivan  KR﻿,  et al.  American Cancer Society Nutrition and Physical Activity Guideline for cancer survivors. ﻿  CA Cancer J Clin. 2022;72(3):230-262. doi:10.3322/caac.21719﻿PubMedGoogle ScholarCrossref
`

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Set the runtime to edge for best performance
export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const prompt = `You are a medical education assistant that helps medical doctors get up-to-date about medical articles.
  Your job is to answer users queries about the article, that can be a article summarization or specific queries about the methodology, results, or conclusions.
  Of course you should engage in a dialog, so if user greets you, you should greet back. But always add that you are here to help the user with the article.
  So you should only answer when the user asks about the article. Do not jump to a answer if the user does not ask about the article.
  When you are responding about the article you must attain to the article content and be concise and clear.
  <<< ${article} >>>`

  console.log('Messages length: ', messages.length)

  messages.push({
    role: 'system',
    content: prompt
  })

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
