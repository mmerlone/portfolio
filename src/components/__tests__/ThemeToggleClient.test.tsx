import { fireEvent, render, screen } from "@testing-library/react";
import ThemeToggleClient from "@/components/ThemeToggleClient";
import { ThemeEnum } from "@/types/theme";

const setTheme = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: (): { theme: string; setTheme: typeof setTheme } => ({
    theme: ThemeEnum.SYSTEM,
    setTheme,
  }),
}));

describe("ThemeToggleClient", () => {
  beforeEach((): void => {
    setTheme.mockClear();
  });

  it("renders a three-position theme toggle and keeps system selected by default", () => {
    render(<ThemeToggleClient />);

    expect(screen.getByRole("radio", { name: "Light" })).toBeTruthy();
    expect(screen.getByRole("radio", { name: "System" })).toHaveProperty(
      "checked",
      true,
    );
    expect(screen.getByRole("radio", { name: "Dark" })).toBeTruthy();
  });

  it("calls setTheme when selecting a different theme", () => {
    render(<ThemeToggleClient />);

    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));

    expect(setTheme).toHaveBeenCalledWith(ThemeEnum.DARK);
  });

  it("uses unique group names for multiple toggle instances", () => {
    render(
      <>
        <ThemeToggleClient />
        <ThemeToggleClient />
      </>,
    );

    const radioNames = Array.from(
      document.querySelectorAll('input[type="radio"]'),
    ).map((element) => element.getAttribute("name"));

    expect(new Set(radioNames).size).toBe(2);
  });
});
