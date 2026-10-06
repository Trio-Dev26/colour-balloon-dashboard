import { useEffect, useMemo } from 'react';

/** Preview URL for a picked file (revoked on change/unmount), or the URL of an image already on the server. */
export function useObjectUrl(source: File | string | null | undefined): string | undefined {
   const url = useMemo(() => (source instanceof File ? URL.createObjectURL(source) : (source ?? undefined)), [source]);

   useEffect(() => {
      if (!(source instanceof File) || !url) return;
      return () => URL.revokeObjectURL(url);
   }, [source, url]);

   return url;
}
