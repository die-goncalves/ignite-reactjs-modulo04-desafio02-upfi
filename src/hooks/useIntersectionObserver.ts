import { useEffect } from 'react'

export default function useIntersectionObserver({
  target,
  onIntersect,
  threshold = [0, 0.5, 1],
  rootMargin = "0px",
  enabled = true,
  isLoading
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0]['isIntersecting'] === true) {
        onIntersect();
      }
    }, { threshold, rootMargin });

    const el = target && target.current
    if (!el) {
      return
    }

    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [target.current, enabled, isLoading])
}
