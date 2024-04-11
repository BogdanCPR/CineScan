import { Typography, useTheme } from '@mui/material'
import React from 'react'

const Logo = () => {
	const theme = useTheme();

  	return (
		<Typography fontWeight="700" fontSize="1.7rem">
			Cine<span style={{ color: theme.palette.primary.main }}>Scan</span>
		</Typography>
  )
}

export default Logo;