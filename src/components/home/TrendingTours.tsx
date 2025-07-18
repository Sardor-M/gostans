import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TourProps } from '@/types/index';
import TourCard from '@/components/Tours/ToursCard';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Button from '@/components/Common/Button';

const SectionContainer = styled.section`
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.colors.lightBackground};

    ${({ theme }) => theme.responsive.maxMobile} {
        padding: 2rem 1rem;
    }
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
    gap: 1rem;
    flex-wrap: wrap;

    ${({ theme }) => theme.responsive.maxMobile} {
        padding: 0;
        justify-content: center;
    }
    ${({ theme }) => theme.responsive.maxMobile} {
        padding: 0;
        margin-bottom: 2rem;
    }
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
    text-align: left;

    ${({ theme }) => theme.responsive.maxMobile} {
        font-size: 1.5rem;
        text-align: left;
    }
`;

const ViewAllLink = styled(Link)`
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    white-space: nowrap;

    &:hover {
        text-decoration: underline;
    }

    ${({ theme }) => theme.responsive.maxMobile} {
        font-size: 0.875rem;

        svg {
            width: 16px;
            height: 16px;
        }
    }
`;

const ToursGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    ${({ theme }) => theme.responsive.maxMobile} {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    ${({ theme }) => theme.responsive.tablet} {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const NavigationButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;

    ${({ theme }) => theme.responsive.maxMobile} {
        justify-content: center;
    }
`;

type TrendingToursProps = {
    tours: TourProps[];
};

export default function TrendingTours({ tours }: TrendingToursProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const toursPerPage = 4;
    const totalPages = Math.ceil(tours.length / toursPerPage);

    const currentTours = tours.slice(currentPage * toursPerPage, (currentPage + 1) * toursPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    };

    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>Trending Tours</SectionTitle>
                <ViewAllLink to="/tours">
                    Explore All
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 18L15 12L9 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </ViewAllLink>
            </SectionHeader>

            <ToursGrid>
                {currentTours.map((tour) => (
                    <TourCard
                        buttonText="See more"
                        // variant="link"
                        key={tour.id}
                        id={tour.id}
                        title={tour.title}
                        description={tour.description}
                        price={tour.price}
                        image={tour.image}
                        country={tour.country}
                        status={tour.status}
                    />
                ))}
            </ToursGrid>

            <NavigationButtons>
                <NavigationButtons>
                    <Button
                        variant="circle"
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        aria-label="Previous page"
                    >
                        <FaArrowLeft />
                    </Button>

                    <Button
                        variant="circle"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages - 1}
                        aria-label="Next page"
                    >
                        <FaArrowRight />
                    </Button>
                </NavigationButtons>
            </NavigationButtons>
        </SectionContainer>
    );
}
