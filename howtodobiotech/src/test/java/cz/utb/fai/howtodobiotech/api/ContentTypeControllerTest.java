package cz.utb.fai.howtodobiotech.api;

import cz.utb.fai.howtodobiotech.api.categories.ContentTypeController;
import cz.utb.fai.howtodobiotech.models.categories.ContentType;
import cz.utb.fai.howtodobiotech.services.categories.ContentTypeService;
import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ContentTypeControllerTest {
    @Mock
    private ContentTypeService contentTypeService;

    @InjectMocks
    private ContentTypeController contentTypeController;

    private MockMvc mockMvc;

    @Test
    void testSelectContentByType() {
        EContentType contentType = EContentType.SKILL_OPPORTUNITY;
        ContentType content = new ContentType();
        content.setType(contentType);
        Optional<ContentType> contentData = Optional.of(content);

        when(contentTypeService.findByType(contentType)).thenReturn(contentData);

        ResponseEntity<ContentType> response = contentTypeController.selectContentByType(contentType);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contentData.get(), response.getBody());
    }
}
