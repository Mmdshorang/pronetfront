import React from "react";

const RtlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div dir="rtl">{children}</div>;
};

export default RtlProvider;
