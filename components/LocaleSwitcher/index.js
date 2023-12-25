import { useRouter } from "next/router";
import { Nav } from "react-bootstrap";

export default function LocaleSwitcher() {

  const { locale, locales, route, push } = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  const toggleLanguage = () => {
    const newLocale = otherLocale || locales[0];

    push(route, route, { locale: newLocale });
  };
  return (
    <Nav.Link>
      <button
        className="btn btn-outline-secondary w-100"
        onClick={toggleLanguage}
      >
        {otherLocale === "ml" ? "Malayalam" : "English"}
      </button>
    </Nav.Link>
  );
}
