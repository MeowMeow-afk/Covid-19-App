import React from "react";
import "./Info.css";
import Banner from "../images/banner.jpg";
import { useStateValue } from "../../StateProvider";
function Info() {
  const [{ darkMode }, dispatch] = useStateValue();

  return (
    <div className={`info ${darkMode ? "darkmode__info" : null}`}>
      <div className="info__heading">
        <h1>Everything you should know about the coronavirus outbreak</h1>
      </div>
      <img className="worldClosed" src={Banner} />
      <div className="info__overview">
        <p>
          A novel strain of coronavirus — SARS-CoV-2 — was first detected in
          December 2019 in Wuhan, a city in China’s Hubei province with a
          population of 11 million, after an outbreak of pneumonia without an
          obvious cause. The virus has now spread to over 200 countries and
          territories across the globe, and was characterised as a pandemic by
          the World Health Organization (WHO) on 11 March 2020.
          <hr />
          As of 21 December 2020, there were 75,479,471 laboratory-confirmed
          cases of coronavirus disease 2019 (COVID-19) infection globally, with
          1,686,267 reported deaths. The number of cases and deaths outside of
          China overtook those within the country on 16 March 2020. As of 21
          December 2020, there have been 2,040,147 confirmed cases of the virus
          in the UK and 67,401 of these have died (in all settings, within 28
          days of the test). This article gives a brief overview of the new
          virus and what to look out for, and will be updated weekly. It
          provides answers to the following questions:
        </p>
      </div>
      <div className="info__topic">
        <div className="topic__container" data-aos="fade-left">
          <div className="headingAndQuote">
            <h2 className="container__heading">What are coronaviruses?</h2>
          </div>

          <div className="container__info">
            <p>
              SARS-CoV-2 belongs to a family of single-stranded RNA viruses
              known as coronaviridae, a common type of virus which affects
              mammals, birds and reptiles.
              <hr /> In humans, it commonly causes mild infections, similar to
              the common cold, and accounts for 10–30% of upper respiratory
              tract infections in adults. More serious infections are rare,
              although coronaviruses can cause enteric and neurological disease.
              The incubation period of a coronavirus varies but is generally up
              to two weeks.
              <hr /> Previous coronavirus outbreaks include Middle East
              respiratory syndrome (MERS), first reported in Saudi Arabia in
              September 2012, and severe acute respiratory syndrome (SARS),
              identified in southern China in 2003. MERS infected around 2,500
              people and led to more than 850 deaths while SARS infected more
              than 8,000 people and resulted in nearly 800 deaths. The case
              fatality rates for these conditions were 35% and 10%,
              respectively.
              <hr /> SARS-CoV-2 is a new strain of coronavirus that has not been
              previously identified in humans. Although the incubation period of
              this strain is currently unknown, the United States Centers for
              Disease Control and Prevention indicate that symptoms may appear
              in as few as 2 days or as long as 14 days after exposure. Chinese
              researchers have indicated that SARS-CoV-2 may be infectious
              during its incubation period
            </p>
          </div>
        </div>

        <div className="topic__container" data-aos="fade-right">
          <div className="headingAndQuote">
            <h2 className="container__heading">
              Where has the new coronavirus come from?
              <span className="quote">
                The number of cases and deaths outside of China overtook those
                within it on 16 March 2020
              </span>
            </h2>
          </div>

          <div className="container__info">
            <p>
              It is currently unclear where the virus has come from. Originally,
              the virus was understood to have originated in a food market in
              Wuhan and subsequently spread from animal to human. Some research
              has claimed that the cross-species transmission may be between
              snake and human; however, this claim has been contested.
              <hr /> Mammals such as camels and bats have been implicated in
              previous coronavirus outbreaks, but it is not yet clear the exact
              animal origin, if any, of SARS-CoV-2.
            </p>
          </div>
        </div>

        <div className="topic__container" data-aos="fade-left">
          <div className="headingAndQuote">
            <h2 className="container__heading">How contagious is COVID-19?</h2>
          </div>
          <div className="container__info">
            <p>
              Increasing numbers of confirmed diagnoses, including in healthcare
              professionals, has indicated that person-to-person spread of
              SARS-CoV-2 is occurring. The preliminary reproduction number (i.e.
              the average number of cases a single case generates over the
              course of its infectious period) is currently estimated to be
              between 1.4 to 2.5, meaning that each infected individual could
              infect between 1.4 and 2.5 people
              <hr />
              Similarly to other common respiratory tract infections, MERS and
              SARS are spread by respiratory droplets produced by an infected
              person when they sneeze or cough. Measures to guard against the
              infection work under the current assumption that SARS-CoV-2 is
              spread in the same manner.
            </p>
          </div>
        </div>

        <div className="topic__container" data-aos="fade-right">
          <div className="headingAndQuote">
            <h2 className="container__heading">
              How is the coronavirus spreading?
            </h2>
          </div>
          <div className="container__info">
            <p>
              The virus is thought to spread mainly between people in close
              contact with one another by respiratory droplets produced when an
              infected person coughs, sneezes or talks, according to the CDC.
              Those droplets can land in the mouths or noses of nearby people or
              be inhaled into the lungs. Aerosol transmission (tiny exhaled
              particles that can linger in indoor air for longer durations and
              travel farther than 6 feet) can also play a role in the spread of
              the virus, which reinforces the importance of mask wearing,
              experts say.
              <hr />
              According to the CDC, “the virus may be spread in other ways,”
              including by touching a contaminated surface or object and then
              touching your mouth, nose or eyes. However, this is not thought to
              be the main way the virus spreads, the agency maintains.
              <hr />
              Finally, it’s important to note that COVID-19 can be spread by
              people before they start showing symptoms of COIVID-19
              (presymptomatic) or even if they never develop symptoms
              (asymptomatic).
            </p>
          </div>
        </div>

        <div className="topic__container" data-aos="fade-right">
          <div className="headingAndQuote">
            <h2 className="container__heading">
              WHO report highlights four SARS-CoV-2 variants
            </h2>
          </div>
          <div className="container__info">
            <p>
              Four variants of the SARS-CoV-2 virus responsible for causing
              COVID-19 are circulating worldwide, said a report released by the
              World Health Organization (WHO) on Thursday.
              <hr />
              A variant of the virus with a D614G substitution in the gene
              encoding the spike protein emerged in late January or early
              February 2020. The mutated virus replaced the initial SARS-CoV-2
              strain by June 2020 and became dominant, said the report. This
              strain has increased infectivity and transmission but doesn't
              cause more severe illness or alter the effectiveness of existing
              laboratory diagnostics, therapeutics, vaccines, or public health
              preventive measures.
              <hr />
              The second variant was identified in Denmark's mink breeding farms
              in late January or early February 2020. Named "Cluster 5" by
              Danish authorities, this variant may reduce virus neutralization
              in humans, which could potentially decrease the extent and
              duration of immune protection following natural infection or
              vaccination. The report said this variant does not appear to have
              spread widely. <hr />
              On December 14, 2020, the UK reported to WHO a new variant
              referred to as SARS-CoV-2 VOC 202012/01, which first appeared in
              southeast England. Preliminary studies suggested that this variant
              has increased transmissibility but indicated no change in disease
              severity. The report said that VOC-202012/01 had been reported in
              31 other countries/territories/areas in five of the six WHO
              regions as of December 30, 2020.
              <hr />
              The fourth variant, 501Y.V2, was reported on December 18, in South
              Africa. According to preliminary studies, the variant is
              associated with a higher viral load, suggesting a potential for
              increased transmissibility.
              <hr />
              But there's no clear evidence of variant causing more severe
              disease or worse outcomes. In the week beginning November 16,
              2020, South African health authorities found that this new variant
              has mostly replaced other SARS-CoV-2 viruses circulating in the
              Eastern Cape, Western Cape KwaZulu-Natal provinces, the report
              added.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
