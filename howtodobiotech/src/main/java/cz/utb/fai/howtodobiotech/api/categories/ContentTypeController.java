package cz.utb.fai.howtodobiotech.api.categories;

import cz.utb.fai.howtodobiotech.models.categories.ContentType;
import cz.utb.fai.howtodobiotech.services.categories.ContentTypeService;
import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RequestMapping("api/content-type")
@RestController
public class ContentTypeController {

    @Autowired
    ContentTypeService contentTypeService;

    @GetMapping("/{type}")
    public ResponseEntity<ContentType> selectContentByType(@PathVariable("type") EContentType type) {
        Optional<ContentType> contentData = contentTypeService.findByType(type);

        if (contentData.isPresent()) {
            return new ResponseEntity<>(contentData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
