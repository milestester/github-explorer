import { render } from "@testing-library/react";
import { useInfiniteScroll } from "../useInfiniteScroll";

let mockObserverCallback: IntersectionObserverCallback;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

beforeAll(() => {
  global.IntersectionObserver = jest.fn().mockImplementation((cb: IntersectionObserverCallback) => {
    mockObserverCallback = cb;
    return { observe: mockObserve, disconnect: mockDisconnect, unobserve: jest.fn() };
  });
});

beforeEach(() => {
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  (global.IntersectionObserver as jest.Mock).mockClear();
});

interface Props {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

function TestComponent(props: Props) {
  const { scrollContainerRef, loadMoreRef } = useInfiniteScroll(props);
  return (
    <div ref={scrollContainerRef}>
      <div ref={loadMoreRef} />
    </div>
  );
}

function intersect(isIntersecting: boolean) {
  mockObserverCallback(
    [{ isIntersecting } as IntersectionObserverEntry],
    {} as IntersectionObserver
  );
}

describe("useInfiniteScroll", () => {
  it("calls fetchNextPage when intersecting and hasNextPage is true", () => {
    const fetchNextPage = jest.fn();
    render(<TestComponent hasNextPage={true} isFetchingNextPage={false} fetchNextPage={fetchNextPage} />);
    intersect(true);
    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("does not call fetchNextPage when not intersecting", () => {
    const fetchNextPage = jest.fn();
    render(<TestComponent hasNextPage={true} isFetchingNextPage={false} fetchNextPage={fetchNextPage} />);
    intersect(false);
    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("does not call fetchNextPage when hasNextPage is false", () => {
    const fetchNextPage = jest.fn();
    render(<TestComponent hasNextPage={false} isFetchingNextPage={false} fetchNextPage={fetchNextPage} />);
    intersect(true);
    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("does not call fetchNextPage when isFetchingNextPage is true", () => {
    const fetchNextPage = jest.fn();
    render(<TestComponent hasNextPage={true} isFetchingNextPage={true} fetchNextPage={fetchNextPage} />);
    intersect(true);
    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(
      <TestComponent hasNextPage={true} isFetchingNextPage={false} fetchNextPage={jest.fn()} />
    );
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
