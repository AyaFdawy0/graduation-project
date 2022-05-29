import React from 'react'
import FeatureBox from './FeatureBox'
import featureimage1 from '../images/feature.jpg'
import featureimage2 from '../images/feature_2.jpg'
import featureimage3 from '../images/feature_3.jpg'
import featureimage4 from '../images/features_4.jpg'
import featureimage5 from '../images/feature_5.jpg'
import featureimage6 from '../images/feature_6.jpg'
function Feature() {
    return (
        <div id="features">
            <h3>Features</h3>
            <div className="a-container">
             
                <FeatureBox image={featureimage4} title="Grouping team "des="members or students in 
                private rooms for organizing and following up their work"/>  
                <FeatureBox image={featureimage2} title="Providing posts news " des="feed to keep up
                with their supervisor with latest news"/> 
                <FeatureBox image={featureimage3} title="Private chat rooms " des="between members to 
                dispense being distortedbetween any other apps"/> 
            </div>
            <div className="a-container">
             
                <FeatureBox image={featureimage1} title="Upload images"des="we also provide the capability
                to upload photos  with various extensions and organizing them for
                easily and fast access"/>  
                <FeatureBox image={featureimage5} title="Live Meetimg " des="meeting
                with constant and clear connection for video and screen streaming"/> 
                <FeatureBox image={featureimage6} title="Schedule meeting" des="all of these features are organized
                and scheduled in our calendar where you can also schedule new and special events"/> 
            </div>
            </div>
    )
}

export default Feature