import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LandingNavBar from '../../components/LandingNavBar';
import LandingHeader from '../../components/LandingHeader';
import LandingTopContainer from '../../components/LandingTopContainer';
import LandingTabsContainer from '../../components/LandingTabsContainer';
import LandingRecommendations from '../../components/LandingRecommendations';
import LandingFeedback from '../../components/LandingFeedback';
import LandingSubscription from '../../components/LandingSubscription';
import LandingViewPlan from '../../components/LandingViewPlan';
import LandingFooter from '../../components/LandingFooter';
import './index.css';

export default function Landing() {
	return (
		<Container maxWidth="sm">
			<Box sx={{ my: 4 }}>
				<LandingNavBar />
				<LandingHeader />
				<LandingTopContainer />
				<LandingTabsContainer />
				<LandingRecommendations />
				<LandingFeedback />
				<LandingSubscription />
				<LandingViewPlan />
				<LandingFooter />
			</Box>
		</Container>
	)
}