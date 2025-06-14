import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuote } from "../useQuote";
import { QuoteInterface } from "@/types/api";
import * as api from "../../lib/api";
import { siteConfig } from "@/config/site";
import '@jest/globals';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Mocks
jest.mock("../../lib/api");
jest.mock("@/config/site", () => ({
  siteConfig: {
    quote: {
      firstQuote: {
        q: "Test first quote",
        a: "Test author",
        h: "<blockquote>Test first quote</blockquote>",
        s: {
          anchor: "Test source",
          title: "Test source title"
        }
      }
    }
  }
}));

const mockFetchQuote = api.fetchQuote as jest.Mock;

// Define mock functions first to avoid ReferenceError due to jest.mock hoisting
const mockTanStackUseQuery = jest.fn();
const mockTanStackUseQueryClient = jest.fn();

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");
  return {
    ...(typeof originalModule === "object" ? originalModule : {}),
    useQuery: (...args: unknown[]) => mockTanStackUseQuery(...args),
    useQueryClient: (...args: unknown[]) => mockTanStackUseQueryClient(...args),
  };
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

// Add proper types
interface MockResponse {
  data: {
    quote: string;
    author: string;
  };
}

describe("useQuote", () => {
  let queryClient: QueryClient;
  let mockInternalQueryRefetch: jest.Mock;

  // Helper to set up useQuery mock for a test
  const setupUseQueryMock = (initialData?: QuoteInterface[]) => {
    mockInternalQueryRefetch = (jest
      .fn()
      // @ts-expect-error: mockResolvedValue is used for test setup
      .mockResolvedValue({ data: initialData } as { data?: QuoteInterface[] }) as jest.Mock);
    const state = {
      data: initialData,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockInternalQueryRefetch,
      isFetching: false,
    };
    mockTanStackUseQuery.mockImplementation(() => state);
    return state; // Return to allow modification in tests
  };

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = createTestQueryClient();
    // @ts-expect-error: prefetchQuery is being mocked for test setup
    queryClient.prefetchQuery = (jest.fn().mockResolvedValue(undefined) as jest.Mock);
    mockTanStackUseQueryClient.mockReturnValue(queryClient);

    // Default fetchQuote mock
    (mockFetchQuote as jest.Mock).mockImplementation(() => Promise.resolve([{
      q: "Default API Quote",
      a: "API Author",
      h: "",
      s: {
        anchor: "ZenQuotes API",
        href: "https://zenquotes.io/",
        title: "Visit ZenQuotes"
      }
    }] as QuoteInterface[]));
    setupUseQueryMock([]); // Setup with empty array initially

    const mockResponse: MockResponse = {
      data: {
        quote: 'Test quote',
        author: 'Test author'
      }
    };

    // @ts-expect-error - Mocking fetch for testing
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should return firstQuote from config when disabled", () => {
    const { result } = renderHook(() => useQuote({ enabled: false }), { wrapper: TestWrapper });

    expect(result.current.data).toEqual(siteConfig.quote?.firstQuote);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return errorQuote when API call fails", () => {
    const queryState = setupUseQueryMock([api.errorQuote(500)]);
    queryState.isError = true;
    queryState.error = null;

    const { result } = renderHook(() => useQuote({ enabled: true }), { wrapper: TestWrapper });

    expect(result.current.data).toEqual(api.errorQuote(500));
    expect(result.current.isError).toBe(true);
  });

  it("should cycle through quotes", () => {
    const q1: QuoteInterface = { 
      q: "Q1", 
      a: "A1", 
      h: "",
      s: {
        anchor: "ZenQuotes API",
        href: "https://zenquotes.io/",
        title: "Visit ZenQuotes"
      }
    };
    const q2: QuoteInterface = { 
      q: "Q2", 
      a: "A2", 
      h: "",
      s: {
        anchor: "ZenQuotes API",
        href: "https://zenquotes.io/",
        title: "Visit ZenQuotes"
      }
    };
    setupUseQueryMock([q1, q2]);

    const { result } = renderHook(() => useQuote({ enabled: true }), {
      wrapper: TestWrapper,
    });

    // Should start with first quote
    expect(result.current.data).toEqual(q1);

    // Cycle through quotes
    act(() => {
      result.current.refetch();
    });
    expect(result.current.data).toEqual(q2);

    // Should cycle back to first quote
    act(() => {
      result.current.refetch();
    });
    expect(result.current.data).toEqual(q1);
  });

  it("should reflect useQuery isLoading state", () => {
    const queryState = setupUseQueryMock();
    queryState.isLoading = true;

    const { result } = renderHook(() => useQuote({ enabled: true }), {
      wrapper: TestWrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should reflect useQuery isError state", () => {
    const queryState = setupUseQueryMock();
    queryState.isError = true;
    queryState.error = null;

    const { result } = renderHook(() => useQuote({ enabled: true }), {
      wrapper: TestWrapper,
    });

    expect(result.current.isError).toBe(true);
  });

  it('should fetch and return quote data', async () => {
    const mockQuote: QuoteInterface = {
      q: "Default API Quote",
      a: "API Author",
      h: "",
      s: {
        anchor: "ZenQuotes API",
        href: "https://zenquotes.io/",
        title: "Visit ZenQuotes"
      }
    };
    setupUseQueryMock([mockQuote]);

    const { result } = renderHook(() => useQuote({ enabled: true }), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data?.q).toBe("Default API Quote");
    expect(result.current.data?.a).toBe("API Author");
  });
});
