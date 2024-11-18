export // For example, the `Data` interface should resemble this structure:
interface Data {
    avg_rating: number;
    email: string;
    name: string;
    image: string;
    url: string;
    id: string;
}

export interface CategoryProps {
        id: string;
        name: string;
        icon: string;
}

export interface OrganizationData{
    avg_rating: number;
    category: {
        name: string;
    };
    feedback: Feedback[];
    id: string;
    image: string;
    name: string;
    url: string;
}

export interface Feedback {
    CompanyID: string;
    CustomerID: string;
    customer: {
        given_name: string;
        picture: string;
    }
    DateofExperience: string; // Use ISO 8601 date format for clarity
    DateofFeedback: string;   // Use ISO 8601 format for dates
    DownVotes: number;
    Header: string;           // Title of the feedback
    Rating: number;           // Rating, typically 1-5
    Review: string;
    id: string;
    upVoted: boolean;
    upVotes: string[];
}