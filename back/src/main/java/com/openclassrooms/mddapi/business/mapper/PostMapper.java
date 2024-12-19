package com.openclassrooms.mddapi.business.mapper;

import com.openclassrooms.mddapi.business.entity.Post;
import com.openclassrooms.mddapi.common.DTO.apiRequest.PostRequestDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.CommentResponseDTO;
import com.openclassrooms.mddapi.common.DTO.apiResponse.PostResponseDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
public class PostMapper {

    private final TopicMapper topicMapper;

    private final CommentMapper commentMapper;

    private final UserMapper userMapper;

    public PostMapper(TopicMapper topicMapper, CommentMapper commentMapper, UserMapper userMapper) {
        this.topicMapper = topicMapper;
        this.commentMapper = commentMapper;
        this.userMapper = userMapper;
    }

    /**
     * Converts a PostRequestDTO object to a Post object
     *
     * @param postRequestDTO as the PostRequestDTO to convert
     * @return Post
     */
    public Post convertToEntity(PostRequestDTO postRequestDTO) {
        Post post = new Post();
        post.setTitle(postRequestDTO.getTitle());
        post.setContent(postRequestDTO.getContent());

        return post;
    }

    /**
     * Converts a Post entity to a PostResponseDTO objet
     *
     * @param post           as the Post to convert
     * @param displayComment as true if we want to display comments if exist
     * @return PostResponseDTO
     */
    public PostResponseDTO convertToResponseDTO(Post post, Boolean displayComment) {
        PostResponseDTO responseDTO = new PostResponseDTO();
        responseDTO.setId(post.getId());
        responseDTO.setAuthor(userMapper.convertToShortResponseDTO(post.getAuthor()));
        responseDTO.setTitle(post.getTitle());
        responseDTO.setCreatedAt(post.getCreatedAt());
        responseDTO.setTopic(topicMapper.convertToResponseDTO(post.getTopic()));
        responseDTO.setContent(post.getContent());
        if (displayComment) {
            List<CommentResponseDTO> comments = commentMapper.convertAllToResponseDTO(post.getComments());
            comments.sort(Comparator.comparing(CommentResponseDTO::getCreatedAt).reversed());
            responseDTO.setComments(comments);
        }

        return responseDTO;
    }

    /**
     * Converts a list of Posts to a list of PostResponseDTO without the associated comments
     *
     * @param posts as a list of Post
     * @return List<PostResponseDTO>
     */
    public List<PostResponseDTO> convertAllToResponseDTO(List<Post> posts) {
        List<PostResponseDTO> responseDTO = new ArrayList<>();
        for (Post post : posts) {
            responseDTO.add(convertToResponseDTO(post, false));
        }
        return responseDTO;
    }
}
