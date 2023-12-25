import HomeLayout from "layouts/HomeLayout";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, ButtonGroup, Carousel, Image } from "react-bootstrap";

function EntrepreneurshipProgram() {
  const router = useRouter();
  const [openAbout, setOpenAbout] = useState(false);
  const t = useTranslations("common")
  return (
    <section className=" d-flex flex-column justify-content-center px-2">

      <h2 className="happiness fw-bold ls-sm text-center my-4 my-md-8">
        {t('entrepreneurship')}
      </h2>

      <Carousel controls={false} indicators={false}>
        <Carousel.Item className="px-2 ">
          <Image
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1699164802258-19f3d460a0d7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
      {/* //selection tab */}
      <ButtonGroup
        aria-label="Basic mixed styles example"
        className="px-4 my-2 my-md-4 my-md-10 w-100 d-flex flex-column flex-md-row"
      >
        <Button
          variant={openAbout ? "primary p-4 mb-2 mb-md-0" : "outline-primary p-4 mb-2 mb-md-0"}
          onClick={() => setOpenAbout(!openAbout)}
        >
          About
        </Button>
        <Button
          variant="outline-primary p-4"
          onClick={() => router.push("/entrepreneurship/register")}
        >
          Registration
        </Button>
      </ButtonGroup>
      {/* content of the page */}
      <div className=" p-4 text-center text-justify">
        {openAbout ? (
          <p>
            തളിപ്പറമ്പ് മണ്ഡലത്തിലെ സ്റ്റാർട്ടപ്പ് സംരംഭങ്ങൾ ആരംഭിക്കാൻ
            ആഗ്രഹിക്കുന്ന സ്ത്രീകൾക്ക് സർക്കാർ സംവിധാങ്ങളെയും ഏജൻസികളെയും
            പരിചയപ്പെടുത്തി ആവശ്യമായ പിന്തുണാ സംവിധാനം ഒരുക്കി അഭ്യസ്തവിദ്യരായ
            യുവതികളെ കുടുംബശ്രീയ്ക്ക് കീഴിൽ സ്റ്റാർട്ടപ്പുകൾ തുടങ്ങുന്നതിലേക്ക്
            നയിക്കുന്നതിന് സംസ്ഥാനത്ത് ആദ്യമായി സംഘടിപ്പിക്കുന്ന വനിതാ സംരംഭകത്വ
            പരിപാടി
          </p>
        ) : (
          <p>
            തളിപ്പറമ്പ് മണ്ഡലത്തിൽ നവംബർ 26, 27 തീയതികളിൽ കുടുംബശ്രീ
            സ്റ്റാർട്ടപ്പ് വർക്ക്ഷോപ്പ് സംഘടിപ്പിച്ചു. നവംബർ 26 ന് വൈകുന്നേരം 4
            മണിക്ക് ബഹു. തദ്ദേശസ്വയംഭരണ വകുപ്പ് മന്ത്രി ശ്രീ.എം.ബി.രാജേഷ്
            വർക്ക്ഷോപ്പ് ഉദ്ഘാടനം ചെയ്തു. തളിപ്പറമ്പ് മണ്ഡലത്തിലെ സ്റ്റാർട്ടപ്പ്
            സംരംഭങ്ങൾ ആരംഭിക്കാൻ ആഗ്രഹിക്കുന്ന സ്ത്രീകൾക്ക് പ്രചോദനം
            നൽകുന്നതിനും സാധ്യതകളെ കുറിച്ചുള്ള അറിവ് നൽകുന്നതിനുമായാണ്
            സ്റ്റാർട്ടപ്പ് വർക്ക്ഷോപ്പ്. കുടുംബശ്രീയുമായി സഹകരിച്ചു കൊണ്ടാണ് ഈ
            പരിപാടി സംഘടിപ്പിച്ചത്. വിജ്ഞാന സമ്പദ് വ്യവസ്ഥയിലടക്കം തൊഴിലുകളും
            സംരംഭങ്ങളും ആരംഭിക്കുന്നതിനായി രൂപീകരിച്ച കുടുംബശ്രീ ഓക്സിലറി
            ഗ്രൂപ്പ് അംഗങ്ങളെ ചേർത്തുകൊണ്ടാണ് ഈ വർക്ക്ഷോപ് . സർക്കാർ
            സംവിധാങ്ങളെയും ഏജൻസികളെയും പരിചയപ്പെടുത്തി ആവശ്യമായ പിന്തുണാ
            സംവിധാനം ഒരുക്കി അഭ്യസ്തവിദ്യരായ യുവതികളെ കുടുംബശ്രീയ്ക്ക് കീഴിൽ
            സ്റ്റാർട്ടപ്പുകൾ തുടങ്ങുന്നതിലേക്ക് നയിക്കുന്നതിന് സംസ്ഥാനത്ത്
            ആദ്യമായി സംഘടിപ്പിക്കുന്ന ഉദ്യമമാണ്‌ ഈ പരിപാടി.
          </p>
        )}
      </div>
    </section>
  );
}
EntrepreneurshipProgram.Layout = HomeLayout;

export default EntrepreneurshipProgram;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../locales/${locale}.json`)).default,
    },
  };
}
