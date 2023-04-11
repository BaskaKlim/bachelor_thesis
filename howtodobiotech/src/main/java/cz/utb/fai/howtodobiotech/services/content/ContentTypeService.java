package cz.utb.fai.howtodobiotech.services.content;

import cz.utb.fai.howtodobiotech.models.content.BiotechExpert;
import cz.utb.fai.howtodobiotech.models.content.ContentType;
import cz.utb.fai.howtodobiotech.repositories.content.ContentTypeRepository;
import cz.utb.fai.howtodobiotech.utils.enums.EContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContentTypeService {
    ContentTypeRepository contentTypeRepository;

    @Autowired
    public ContentTypeService(ContentTypeRepository contentTypeRepository) {
        this.contentTypeRepository = contentTypeRepository;
    }


    public Optional<ContentType> getContentTypeById(Integer id) {
        return contentTypeRepository.findById(id);
    }

    public List<ContentType> getAllContentTypes() {
        List<ContentType> contentTypeList = new ArrayList<ContentType>();
        contentTypeRepository.findAll().forEach(contentTypeList::add);

        return contentTypeList;
    }

    public ContentType addContentType(ContentType contentType) {
        return contentTypeRepository.save(contentType);

    }

    public ContentType updateContentType(ContentType contentType) {
        return contentTypeRepository.save(contentType);
    }

    public void deleteBiotechExpertById(Integer id) {
        contentTypeRepository.deleteById(id);
    }

    public Optional<ContentType> findByName(EContentType contentType) {
        return contentTypeRepository.findByType(contentType);
    }
}
