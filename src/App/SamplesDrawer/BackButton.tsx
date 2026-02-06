import React from "react";

import { ArrowBack, BackHand } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function BackButton() {
	const handleBack = () => {
		window.history.back();
	};

	return (
		<Tooltip title="Back">
			<IconButton onClick={handleBack}>
				<ArrowBack fontSize="small"  />
			</IconButton>
		</Tooltip>
	);
}
