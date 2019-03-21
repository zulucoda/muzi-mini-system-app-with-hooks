/**
 * Created by Muzikayise Flynn Buthelezi (zuluCoda) on 2019/03/21.
 * Copyright mfbproject.co.za - muzi@mfbproject.co.za
 * Copyright zulucoda - mfbproject
 */
import React, { useState } from 'react';

export const useMobileOpen = isMobileOpen => {
  const [mobileOpen, setMobileOpen] = useState(isMobileOpen);
  return [mobileOpen, setMobileOpen];
};
