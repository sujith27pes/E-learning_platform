import { PropTypes } from 'prop-types';

const VideoPlayer = ({ url }) => {
    return (
        <div style={{ margin: '20px 0', maxWidth: '560px', textAlign: 'center' }}>
            <iframe
                width="100%"
                height="315"
                src={url}
                title="YouTube video player"
                
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: '8px' }}
            ></iframe>
        </div>
    );
};

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default VideoPlayer;
