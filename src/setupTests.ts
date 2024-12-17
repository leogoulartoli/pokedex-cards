import "@testing-library/jest-dom";

jest.mock("axios", () => ({
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params: Record<string, unknown>) => {
      if (key === "pokemon.number") {
        return `#${params.number}`;
      }
      return key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => null),
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => null,
  },
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}));
